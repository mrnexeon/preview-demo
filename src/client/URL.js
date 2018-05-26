const elementsIds = (function() {
    var match = window.location.href.match(/place=([\d]+)/);
    if (match !== null) {
        return parseInt(match[1]);
    }
    return NaN;
})();

function getSpecifiedElementIds() {
    return elementsIds;
}

export {
    getSpecifiedElementIds
};

