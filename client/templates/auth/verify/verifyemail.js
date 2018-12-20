Template.VerifyEmailLayout.events({
	'click .resend-verification-link' ( event, template ) {
    Meteor.call( 'sendVerificationLink', ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
      	let userEmail = Meteor.user({_id: Session.get('myuserId')});
        let email = Meteor.user().emails[ 0 ].address;
        Bert.alert( `Verification sent to ${ email }!`, 'success' );
      }
    });
  }
})