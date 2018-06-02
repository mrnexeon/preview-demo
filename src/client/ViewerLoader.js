var savedPlaceId;
var savedEventId;
var seatsPath;

var viewerApp;
var viewerMain;
var seatsModel;
var areaSettings;

var load = (token, eventId, placeId) => {
    savedPlaceId = placeId;
    savedEventId = eventId;
    var options = {
        env: 'AutodeskProduction',
        accessToken: token.access_token
    };
    
    $.getJSON(`/getAreaData`, (data) => {
        areaSettings = data;
        Autodesk.Viewing.Initializer(options, function onInitialized() {
            viewerApp = new Autodesk.Viewing.ViewingApplication('viewer');
            viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Viewer3D);
            viewerApp.loadDocument(areaSettings.areaUrn, onDocumentLoadSuccess, onLoadFail);
        })
    });
}

var onLoadFail = (errorCode, errorMessage, statusCode, statusText) => {
    throw ($`onLoadFail(): ${errorMessage}`);
}

var onDocumentLoadSuccess = (doc) => {
    startLoadingEvent(savedEventId);
    let loadingData = viewerApp.bubble.search({'type':'geometry'});
    if (loadingData.length === 0) {
        throw 'Document contains no viewables';
    }
    viewerApp.selectItem(loadingData[areaSettings.initialViewableIndex].data, onRoomLoadSuccess, onLoadFail);
}

var startLoadingEvent = (eventId) => {
    $.getJSON(`/getEventData`, { eventId: eventId }, (data) => {
        Autodesk.Viewing.Document.load(data.seatsUrn, (document) => {
            var geometryItems3d = Autodesk.Viewing.Document.
                getSubItemsWithProperties(document.getRootItem(), 
                {
                    'type': 'geometry',
                    'role': '3d' 
                }, true);
            seatsPath = document.getViewablePath(geometryItems3d[0]);
        });
        setDescriptionInfo(data);
    })
}

var setDescriptionInfo = (info) => {
    document.getElementById('event-name').innerHTML = info.name;
    document.getElementById('event-photo').src = info.photoUrl;
    document.getElementById('event-description').innerHTML = info.description;
    document.getElementById('event-official-page-link').href = info.officialPageLink;
}


var onRoomLoadSuccess = (viewer, viewable) => {
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, onRoomGeometryLoaded);
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, function(){
        alert(viewer.getSelection());
    });
    viewerMain = viewer;
}

var onRoomGeometryLoaded = (event) => {
    event.target.loadModel(seatsPath, { globalOffset: event.model.getData().globalOffset }, onSeatsLoadSuccess, onLoadFail);
    event.target.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, onRoomGeometryLoaded);
}

var onSeatsLoadSuccess = (model) => {
    model.setAllVisibility(true);
    seatsModel = model;
    sitOnPlace(savedPlaceId);
    document.getElementById('preloader-modal').style.display = 'none';
}

var sitWhenReady = (placeId) => {
    if (!viewerApp) {
        savedPlaceId = placeId;
    } else {
        sitOnPlace(placeId);
    }
}

var sitOnPlace = (placeId) => {
    var item = seatsModel.getData().fragments.fragId2dbId.indexOf(parseInt(placeId));
    if (item == -1) return;

    var fragbBox = new THREE.Box3();
    var nodebBox = new THREE.Box3();

    [item].forEach(function (fragId) {
        seatsModel.getFragmentList().getWorldBounds(fragId, fragbBox);
        nodebBox.union(fragbBox);
    });

    var position = nodebBox.max;
    position.x += areaSettings.cameraSettings.positionXOffset;
    position.y += areaSettings.cameraSettings.positionYOffset;
    position.z += areaSettings.cameraSettings.positionZOffset;

    var camera = viewerMain.getCamera();
    var navTool = new Autodesk.Viewing.Navigation(camera);
    navTool.toPerspective();

    var pivPointPosition = JSON.parse(JSON.stringify(position));
    pivPointPosition.z -= areaSettings.cameraSettings.pivotZOffset;
    navTool.setPivotPoint(pivPointPosition);
    navTool.setPivotSetFlag(true);
    viewerMain.setUsePivotAlways(true);
    navTool.setVerticalFov(areaSettings.cameraSettings.FOV, true);

    var targetVector = areaSettings.cameraSettings.targetVector;
    navTool.setView(position, new THREE.Vector3(targetVector.x, targetVector.y, targetVector.z));
    var upVector = areaSettings.cameraSettings.upVector;
    navTool.setWorldUpVector(new THREE.Vector3(upVector.x, upVector.y, upVector.z), true);
}

export { load, sitWhenReady }