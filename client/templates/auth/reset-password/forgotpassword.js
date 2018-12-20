Template.forgotpassword.events({
  'submit #forgotpassword': function(event, template) {
    event.preventDefault();

    $('.fa-spinner').show();
    var forgotpassword = $(event.currentTarget),
    email = trimInput(forgotpassword.find('#email').val().toLowerCase());

    if (isNotEmpty(email) && isEmail(email)) {

      Accounts.forgotPassword({email: email}, function(error) {
        if (error) {
          $('.fa-spinner').hide();
          if (error.message === 'User not found [403]') {
            Bert.alert('You are not yet registered', 'danger', 'growl-top-right');
            return false;
          } else {
            Bert.alert('We are sorry but something went wrong.', 'danger', 'growl-top-right');
            return false;
          }
        } else {
          $('.fa-spinner').hide();
          Modal.hide('forgotpassword');
          Bert.alert( "Instructions sent! We've sent an email with instructions on how to reset your password.If you don't receive an email within a few minutes, check your spam and junk folders.", 'success', 'growl-top-right' );
        }
      });

    }
    return false;
  },
});

