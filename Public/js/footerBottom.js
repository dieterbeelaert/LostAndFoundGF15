$(window).load(function() {

    var footerHeight = 0, headerHeight = 0, formHeight = 0, $footer = $('footer'), $header = $('header'), $content = $('main');

    var positionForm = function() {     
        footerHeight = $footer.height();
        headerHeight = $header.height();
        contentHeight = $content.height();
        var contentHeight = footerHeight + headerHeight + formHeight;

        if (contentHeight + headerHeight + 150 <= $(window).height() - footerHeight) {

            $footer.css({
                'position': 'absolute',
                'bottom': '0px',
                'width': '100%'
            })
        } else {
            $footer.css({
                'position': 'relative',
                'bottom': 'auto'
            })
        }
           
    }
           
    positionForm();

    $(window)
        .resize(positionForm)
});