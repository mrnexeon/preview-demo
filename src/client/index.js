import { load, sitOnPlace, sitWhenLoaded, viewerApp, setURLData } from './ViewerLoader'
import './style.css'
import { getSpecifiedElementIds, getSpecifiedEvent } from './URL'

var forgeId;
var eventId;

$.getJSON('/auth', (data) => {
    setURLData(getSpecifiedEvent(), getSpecifiedElementIds());
    eventId = !!eventId ? eventId : getSpecifiedEvent();
    load(data, eventId);
})

window.addEventListener("message", function(event){
    forgeId = getSpecifiedElementIds(event.data);
    eventId = getSpecifiedEvent(event.data);
    if (!viewerApp)
    {
        sitWhenLoaded(eventId, forgeId);
    } else {
        sitOnPlace(forgeId);
    }
}, false);
