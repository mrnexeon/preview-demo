var viewerInitialized = false;
var forgeId = 0;

function sendMessageToSit(){
    var targetWindow = document.getElementById("viewer").contentWindow;
    targetWindow.postMessage(forgeId, "http://localhost:8080");
}

$(document).ready(() => {
    $('.btn-preview').click((event) => {
        forgeId = $(event.target).attr("forgeID");

        document.getElementById('vk-share').innerHTML = VK.Share.button(
            {
                url: `http://127.0.0.1:8080/build/?place=${forgeId}`,
                title: 'Я купил билет(ы) на спектакль "Сван" в Центре им. Вс. Мейерхольда с таким видом',
                image: 'http://meyerhold.ru/wp-content/uploads/2015/10/24482661275_aee93118f5_z-600x400.jpg',
                noparse: true
            },
            {
                type: 'custom', 
                text: '<img src="http://vk.com/images/vk32.png" />'
            });

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

