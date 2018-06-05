var viewerInitialized = false;
var forgeId = 0;
var placeName = "";
var eventId = "";

function sendMessageToSit() {
    var targetWindow = document.getElementById("viewer").contentWindow;
    targetWindow.postMessage(`eventId=${eventId}&place=${forgeId}`, "https://mighty-tor-84045.herokuapp.com");
}

$('#event-switcher').change(function () {
    var val = $("#event-switcher option:selected").text();

    switch (val) {
        case "Сван":
            $('.cart-list').load('events/svan.html');
            break;
        case "Фро":
            $('.cart-list').load('events/fro.html');
            break;
        case "Страна Москва":
            $('.cart-list').load('events/moscow.html');
            break;
    }
});

$(document).ready(() => {
    $(document).on('click', '.btn-preview', (event) => {
        forgeId = $(event.target).attr("forgeID");
        placeName = $(event.target).attr("placeName");
        eventId = $(event.target).attr("event");

        var eventName, imageURL;
        switch (eventId) {
            case "1":
                eventName = "Сван";
                imageURL = 'http://meyerhold.ru/wp-content/uploads/2015/10/24482661275_aee93118f5_z-600x400.jpg';
                break;
            case "2":
                eventName = "Фро";
                imageURL = 'http://meyerhold.ru/wp-content/uploads/2017/02/FRO-FB-03-450x215.png';
                break;
            case "3":
                eventName = "Страна Москва";
                imageURL = 'http://meyerhold.ru/wp-content/uploads/2015/12/Strana-Moskva-Kraeva-101-450x215.jpg';
                break;
            default:
                eventName = null;
                break;
        }

        document.getElementById('vk-share').innerHTML = VK.Share.button(
            {
                url: `https://mighty-tor-84045.herokuapp.com/build/?eventId=${eventId}&place=${forgeId}`,
                title: `Вид с места ${placeName}. Cпектакль "${eventName}" в Центре им. Вс. Мейерхольда`,
                image: imageURL,
                noparse: true
            },
            {
                type: 'custom',
                text: '<i class="material-icons" style="color: white">share</i>'
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

            frame.onload = function () {
                sendMessageToSit();
            };
        }

        sendMessageToSit();
    })
})

document.getElementsByClassName("btn-close")[0].addEventListener('click', function () {
    document.getElementById("modal").style.display = 'none';
})

