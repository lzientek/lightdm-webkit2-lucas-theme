var login = (function(lightdm, $) {
    var selected_user = null;
    var password = null;
    var $user = $('#user');
    var $pass = $('#pass');
    var $session = $('#session');
    $('#host').append('<i style="color:#a7a7a7;">' + lightdm.hostname +
        '</i>');

    // private functions
    var setup_users_list = function() {
        var $list = $user;
        var to_append = null;
        $.each(lightdm.users, function(i) {
            var username = lightdm.users[i].name;
            var dispname = lightdm.users[i].display_name;
            $list.append(
                '<option value="' +
                username +
                '">' +
                dispname +
                '</option>'
            );
        });
    };

    var setup_sessions_list = function() {
        $.each(lightdm.sessions, function(i) {
            var session = lightdm.sessions[i];
            $('#session').append('<option value="' +
                session.key + '">' + session.name +
                '</option>');
        });
    };

    var select_user_from_list = function(idx) {
        var idx = idx || 0;

        if (lightdm._username) {
            lightdm.cancel_authentication();
        }

        selected_user = lightdm.users[idx].name;
        if (selected_user !== null) {
            window.start_authentication(selected_user);
        }

        $pass.trigger('focus');
    };

    var update_user = function () {
        if (lightdm._username) {
            lightdm.cancel_authentication();
        }
        lightdm.start_authentication(selected_user);
        $('.co-en-cours').hide();

    };


    // Functions that lightdm needs
    window.start_authentication = function(username) {
        lightdm.cancel_timed_login();
        lightdm.start_authentication(username);
    };
    window.provide_secret = function() {
        password = $pass.val() || null;

        if (password !== null) {
            lightdm.provide_secret(password);
        }
    };
    window.authentication_complete = function() {
        if (lightdm.is_authenticated) {
            lightdm.login(
                lightdm.authentication_user,
                $session.val()
            );
        }else {
          update_user();
          window.show_error('Mauvais mot de pass! Va sur ton PC!');
        }
    };
    // These can be used for user feedback
    window.show_error = function( e) {
        console.log('Error: ' + e);
        showMessage('Error!',e);

    };
    window.show_prompt = function(e) {
        //showMessage('Ubuntu',e);
    };

    // exposed outside of the closure
    var init = function() {
        $(function() {
            setup_users_list();
            setup_sessions_list();
            select_user_from_list();

            $user.on('change', function(e) {
                e.preventDefault();
                var idx = e.currentTarget.selectedIndex;
                select_user_from_list(idx);
            });

            $('form').on('submit', function(e) {
                e.preventDefault();
                $('.co-en-cours').show();
                lightdm.provide_secret($pass.val());
            });
        });
    };

    return {
        init: init
    };
}(lightdm, jQuery));

login.init();
