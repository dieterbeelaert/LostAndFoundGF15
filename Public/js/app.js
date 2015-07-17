$(document).ready(function() {
    var step1 = $(".step1");
    var step2 = $(".step2");

    var search = $("#search");

    step1.show();
    step2.hide();

    $(search).on("click", function() {
        step1.fadeOut(300, function() {
            step2.fadeIn();
        });
    });

});