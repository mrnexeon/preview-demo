const placeId = (function() {
    var match = window.location.href.match(/place=([\d]+)/);
    if (match !== null) {
        return parseInt(match[1]);
    }
    return NaN;
})();

const eventId = (function() {
    var match = window.location.href.match(/eventId=([\d]+)/);
    if (match !== null) {
        return parseInt(match[1]);
    }
    return NaN;
})();

function getSpecifiedPlaceId(str) {
    if (!!str) {
        var match = str.match(/place=([\d]+)/);
        if (match !== null) {
            return parseInt(match[1]);
        }
        return NaN;
    }
    return placeId;
}

function getSpecifiedEvent(str) {
    if (!!str) {
        var match = str.match(/eventId=([\d]+)/);
        if (match !== null) {
            return parseInt(match[1]);
        }
        return NaN;
    }
    return eventId;
}

export {
    getSpecifiedPlaceId,
    getSpecifiedEvent
};

