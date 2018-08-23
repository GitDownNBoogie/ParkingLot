$('#rotateIcon').click(function(){

    let logo = $('#logo');

    switch(logo.attr('class'))
    {
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
            break;
      default:
        logo.addClass('rotate-right');
    }
});
