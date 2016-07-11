$(document).ready(function() {
    closeMessage();
    animateOut();
    $(document).on('click', function() {
        animateIn();
        $(document).off('click');
    });
});

var animationTime = 900;
var nb_message = 0;

function animateOut() {
    $('.leftPannel').css('width', '100%');
    $('.rightPannel').css('margin-right', '-50%');
}

function animateIn() {
    $('.leftPannel').animate({
        width: '50%'
    }, animationTime);
    $('.rightPannel').animate({
        'margin-right': '0'
    }, animationTime);
}

function closeMessage() {
    $('.message').hide();
    $('.message-bg').hide();
}

function showMessage(titre, message) {
    nb_message++;
    if (nb_message >= 3) {
        $('.message-close').attr('disabled', 'disabled');
        setTimeout(function() {
            $('.message-close').removeAttr('disabled');
        }, 3000);
    }
    $('.message').show();
    $('.message-bg').show();
    $('.message-title').text(titre);
    $('.message-text').text(message);
}
