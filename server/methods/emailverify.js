if (Meteor.isServer) {
	Meteor.methods({
		sendVerificationLink() {
			this.autorun(function () {
				let userId = Session.get('myuserId');
		        if ( userId ) {
		          return Accounts.sendVerificationEmail( userId );
		        }
			});
	    }
	});
}