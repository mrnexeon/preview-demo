const roomUrn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA1LTI1LTE3LTM5LTQxLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL3Jvb20uc2tw';
const seatsSwanUrn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA1LTI1LTE4LTM1LTI1LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL3N3YW4uc2tw';
const seatsFroUrn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA1LTI1LTE5LTE2LTM1LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0Zyby5za3A';
const seatsMoscowUrn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA1LTI1LTE4LTM5LTQzLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL01vc2t2YS5za3A';
const initialViewableIndex = 0;

const targetVector = new THREE.Vector3(-703, 2, -1054);
const upVector = new THREE.Vector3(0, 0, 1);
const positionXOffset = 0;
const positionYOffset = -25;
const positionZOffset = 40;
const pivotZOffset = 20;

var savedPlaceId;
var seatsPath;

var viewerApp;
var viewerMain;
var seatsModel;

var load = (token, eventId, placeId) => {
    savedPlaceId = placeId;
    var options = {
        env: 'AutodeskProduction',
        accessToken: token.access_token
    };
    
    Autodesk.Viewing.Initializer(options, function onInitialized() {
        viewerApp = new Autodesk.Viewing.ViewingApplication('viewer');
        viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Viewer3D);
        viewerApp.loadDocument(roomUrn, onDocumentLoadSuccess, onDocumentLoadFailure);
        startLoadingSeats(eventId);
    })
}

var startLoadingSeats = (eventId) => {
    var seatsUrn;
    switch(eventId) {
        case 1:
            seatsUrn = seatsSwanUrn;
            break;
        case 2:
            seatsUrn = seatsFroUrn;
            break;
        case 3:
            seatsUrn = seatsMoscowUrn;
            break;
        default:
            seatsUrn = null;
            break;
    }
    Autodesk.Viewing.Document.load(seatsUrn, (document) => {
        var geometryItems3d = Autodesk.Viewing.Document.
            getSubItemsWithProperties(document.getRootItem(), 
            {
                'type': 'geometry',
                'role': '3d' 
            }, true);
        seatsPath = document.getViewablePath(geometryItems3d[0]);
    });
}

var onDocumentLoadSuccess = (doc) => {
    let loadingData = viewerApp.bubble.search({'type':'geometry'});
    if (loadingData.length === 0) {
        throw 'Document contains no viewables';
    }
    viewerApp.selectItem(loadingData[initialViewableIndex].data, onRoomLoadSuccess, onLoadFail);
}

var onDocumentLoadFailure = (viewerErrorCode) => {
    throw ('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
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

var onLoadFail = (errorCode, errorMessage, statusCode, statusText) => {
    throw ($`onLoadFail(): ${errorMessage}`);
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

    var bBox = nodebBox;

    var camera = viewerMain.getCamera();
    var navTool = new Autodesk.Viewing.Navigation(camera);
    navTool.toPerspective();

    var position = bBox.max;
    position.y += positionXOffset;
    position.y += positionYOffset;
    position.z += positionZOffset;

    var pivPointPosition = JSON.parse(JSON.stringify(position));
    pivPointPosition.z -= pivotZOffset;
    navTool.setPivotPoint(pivPointPosition);
    navTool.setPivotSetFlag(true);
    viewerMain.setUsePivotAlways(true);
    navTool.setVerticalFov(70, true);

    var target = targetVector;
    var up = upVector;

    navTool.setView(position, target);
    navTool.setWorldUpVector(up, true);
}

export { load, sitWhenReady }