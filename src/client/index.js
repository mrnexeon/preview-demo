import { load, sitOnPlace, sitWhenLoaded, viewerApp } from './ViewerLoader'
import './style.css'

$.getJSON('/auth', (data) => {
    load(data);
})

window.addEventListener("message", function(event){
    var forgeId = parseInt(event.data);
    if (!viewerApp)
    {
        sitWhenLoaded(forgeId);
    } else {
        sitOnPlace(viewerApp.getCurrentViewer(), forgeId);
    }
}, false);
