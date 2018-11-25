$(document).on('click', '.jsDividerHead', function () {
    var isVisible = $('.jsListItem').css('display') === 'none';
    if (isVisible) {
        $('.jsListItem').toggle('hide');
    }
    else {
        $('.jsListItem').toggle('show');
        
    }
   
});

$('.jsDividerHead').click = function () {
    $(document).scrollTo('#Superliga');
};