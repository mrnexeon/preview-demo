const urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA1LTA1LTE3LTUxLTA4LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlLzEyMy5za3A';
const initialViewableIndex = 0;

var viewerApp;
var viewer;

function load(token) {
    var options = {
        env: 'AutodeskProduction',
        accessToken: token.access_token
    };
    
    Autodesk.Viewing.Initializer(options, function onInitialized() {
        viewerApp = new Autodesk.Viewing.ViewingApplication('viewer');
        viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Viewer3D);
        viewerApp.loadDocument(urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

function onDocumentLoadSuccess(doc) {
    let loadingData = viewerApp.bubble.search({'type':'geometry'});
    if (loadingData.length === 0) {
        throw 'Document contains no viewables';
    }
    viewerApp.selectItem(loadingData[initialViewableIndex].data, onViewableLoadSuccess, onViewableLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
    throw ('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onViewableLoadSuccess(viewer, viewable) {
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, function(){  
        var forgeId = viewer.getSelection();
        sitOnPlace(viewer, forgeId);
    })
}
function onViewableLoadFail(errorCode) {
    throw ('onItemLoadFail() - errorCode:' + errorCode);
}

function sitOnPlace(viewer, forgeId) {
    var item = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(parseInt(forgeId));
    if (item == -1) return;

    var fragbBox = new THREE.Box3();
    var nodebBox = new THREE.Box3();

    [item].forEach(function (fragId) {
        viewer.model.getFragmentList().getWorldBounds(fragId, fragbBox);
        nodebBox.union(fragbBox);
    });

    var bBox = nodebBox;

    var camera = viewer.getCamera();
    var navTool = new Autodesk.Viewing.Navigation(camera);
    navTool.toPerspective();

    var position = bBox.max;
    position.x -= 0.5;
    position.y -= 0.25;

    var pivPointPosition = JSON.parse(JSON.stringify(position));
    pivPointPosition.z -= 0.1
    navTool.setPivotPoint(pivPointPosition);
    navTool.setPivotSetFlag(true);
    viewer.setUsePivotAlways(true);
    navTool.setVerticalFov(70, true);

    var target = new THREE.Vector3(-7, 2, -10.5);
    var up = new THREE.Vector3(0, 0, 1);

    navTool.setView(position, target);
    navTool.setWorldUpVector(up, true);
}

export {load}