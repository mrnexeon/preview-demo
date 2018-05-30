var getSpecifiedPlaceId = (str) => {
    var source = !!str ? str : window.location.href;
    var match = source.match(/place=([\d]+)/);
    if (match === null) return NaN;
    return parseInt(match[1]);
}

var getSpecifiedEventId = (str) => {
    if (!getSpecifiedEventId.cache) {
        var source = !!str ? str : window.location.href;
        var match = source.match(/eventId=([\d]+)/);
        if (match !== null) {
            getSpecifiedEventId.cache =  parseInt(match[1]);
        } else {
            return NaN;
        }
    }
    return getSpecifiedEventId.cache;
}

export {
    getSpecifiedPlaceId,
    getSpecifiedEventId
};

