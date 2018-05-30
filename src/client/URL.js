const elementsIds = (function() {
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

function getSpecifiedElementIds(str) {
    if (!!str) {
        var match = str.match(/place=([\d]+)/);
        if (match !== null) {
            return parseInt(match[1]);
        }
        return NaN;
    }
    return elementsIds;
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
    getSpecifiedElementIds,
    getSpecifiedEvent
};

