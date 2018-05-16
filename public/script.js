var viewerInitialized = false;

$(document).ready(() => {
    $('.btn-preview').click(() => {
        // Show Modal

        var modal = document.getElementById("modal");
        modal.style.display = 'flex';

        if (!viewerInitialized) {
            var frame = document.createElement('iframe');
            frame.src = "build/index.html";
            frame.width = "100%";
            frame.height = "100%";

            document.getElementsByClassName('modal-content')[0].appendChild(frame);
            viewerInitialized = true;
        }
    })
})

document.getElementsByClassName("btn-close")[0].addEventListener('click', function () {
    document.getElementById("modal").style.display = 'none';
})