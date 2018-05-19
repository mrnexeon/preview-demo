import { load, sitOnPlace, sitWhenLoaded, viewerApp, setURLPlace } from './ViewerLoader'
import './style.css'
import { getSpecifiedElementIds } from './URL'

$.getJSON('/auth', (data) => {
    setURLPlace(getSpecifiedElementIds());
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
