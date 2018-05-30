import './style.css'
import { load, sitOnPlace, sitWhenLoaded, viewerApp, rememberSpecifiedPlace } from './ViewerLoader'
import { getSpecifiedPlaceId, getSpecifiedEvent } from './URL'

$.getJSON('/auth', (data) => {
    var specifiedPlace = getSpecifiedPlaceId();
    var specifiedEvent = getSpecifiedEvent();
    var isFullscreen = !!specifiedPlace && !!specifiedEvent;

    rememberSpecifiedPlace(specifiedPlace);
    var eventId = isFullscreen ? specifiedEvent : onMessageRecieved.eventId;

    load(data, eventId);
})

var onMessageRecieved = (event) => {
    var forgeId = getSpecifiedPlaceId(event.data);
    onMessageRecieved.eventId = getSpecifiedEvent(event.data);

    if (!viewerApp)
    {
        sitWhenLoaded(onMessageRecieved.eventId, forgeId);
    } else {
        sitOnPlace(forgeId);
    }
}

window.addEventListener("message", onMessageRecieved, false);
