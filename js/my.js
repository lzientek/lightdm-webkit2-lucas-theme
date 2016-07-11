$(document).ready(function() {
    start();

});

var animationTime = 900;
var nb_message = 0;

function start() {
    closeMessage();
    animateOut();
    $('#pass').val('');
    $('.co-en-cours').hide();
    $(document).on('click', function() {
        animateIn();
        $(document).off('click');
        $(document).off('keypress');
    });
    $(document).on('keypress', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(document).off('click');
            $(document).off('keypress');
            animateIn();
        }
    });
}

function animateOut() {
    $('.leftPannel').css('width', '100%');
    $('.rightPannel').css('margin-right', '-50%');
}

function animateIn() {
    console.log('in')
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
    $('#pass').focus();
}

function showMessage(titre, message) {
    $('.message-bg').off('click', closeMessage);
    $('.message-bg').on('click', closeMessage);

    $('.message').show();
    $('.message-bg').show();
    $('.message-title').text(titre);
    $('.message-text').text(message);
    $('.message-close').focus();
}
