import './style.css'
import { load, sitWhenReady } from './ViewerLoader'
import { getSpecifiedPlaceId, getSpecifiedEventId } from './stringParser'

$.getJSON('/auth', (data) => {
    var specifiedEvent = getSpecifiedEventId();
    var specifiedPlace = getSpecifiedPlaceId();
    var isFullscreen = !!specifiedPlace && !!specifiedEvent;

    var eventId = isFullscreen ? specifiedEvent : onMessageRecieved.eventId;
    var placeId = isFullscreen ? specifiedPlace : onMessageRecieved.forgeId;

    load(data, eventId, placeId);
})

var onMessageRecieved = (event) => {
    onMessageRecieved.forgeId = getSpecifiedPlaceId(event.data);
    onMessageRecieved.eventId = getSpecifiedEventId(event.data);
    sitWhenReady(onMessageRecieved.forgeId);
}

window.addEventListener("message", onMessageRecieved, false);
