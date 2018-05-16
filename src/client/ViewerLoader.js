const urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA1LTA1LTE3LTUxLTA4LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlLzEyMy5za3A';
const initialViewableIndex = 0;

var viewerApp;
var viewerObserver;

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
/*
function onEverythingLoaded(e) {
    viewerObserver.publish('VIEWER_TEXTURES_LOADED', e);
}
*/

function onViewableLoadSuccess(viewer, viewable) {
    viewerApp = viewer;
    // viewerObserver.publish('VIEWER_LOADED', viewer);
}
function onViewableLoadFail(errorCode) {
    throw ('onItemLoadFail() - errorCode:' + errorCode);
}

export {load, viewerApp}