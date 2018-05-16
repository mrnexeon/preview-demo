var viewerInitialized = false;
var forgeId = 0;

function sendMessageToSit(){
    var targetWindow = document.getElementById("viewer").contentWindow;
    targetWindow.postMessage(forgeId, "http://localhost:8080");
}

$(document).ready(() => {
    $('.btn-preview').click((event) => {
        forgeId = $(event.target).attr("forgeID");
        var modal = document.getElementById("modal");
        modal.style.display = 'flex';

        if (!viewerInitialized) {
            var frame = document.createElement('iframe');
            frame.src = "build/index.html";
            frame.width = "100%";
            frame.height = "100%";
            frame.id = "viewer";

            document.getElementsByClassName('modal-content')[0].appendChild(frame);
            viewerInitialized = true;

            frame.onload= function() {
                sendMessageToSit();
            };
        }

        sendMessageToSit();
    })
})

document.getElementsByClassName("btn-close")[0].addEventListener('click', function () {
    document.getElementById("modal").style.display = 'none';
})