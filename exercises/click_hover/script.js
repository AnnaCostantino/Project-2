$(document).ready(function () {
    $("#button").hover(function () {
        $(".container1").toggleClass("color");
    });

    $(".pink-circle").mouseenter(function () {
        $(".purple-square").fadeOut();
    });

    $(".pink-circle").mouseleave(function () {
        $(".purple-square").fadeIn();
    });

    $('button').click(function() {
        $('.announcement').toggle();
    });

    var btnAdd = document.getElementById('add');
btnAdd.addEventListener("click", addElement, false);

function addElement()
{
    var olList = document.getElementById('list');
    var newListItem = document.createElement('li');
    newListItem.innerText = 'New Item';
    olList.appendChild(newListItem);
}
});
