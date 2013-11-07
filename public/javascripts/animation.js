$('#rotateIcon').click(function(){

    var logo = $('#logo');

    switch(logo.attr('class'))
    {
        case 'rotate-up':
            logo.removeClass('rotate-up');
            logo.addClass('rotate-right');
            break;
        case 'rotate-right':
            logo.removeClass('rotate-right');
            logo.addClass('rotate-down');
            break;
        case 'rotate-down':
            logo.removeClass('rotate-down');
            logo.addClass('rotate-left');
            break;
        case 'rotate-left':
            logo.removeClass('rotate-left');
            logo.addClass('rotate-up');
            break;
    }
    //$(this).removeClass(['rotate-*']);
});
