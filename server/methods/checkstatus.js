/*if (Meteor.isServer) {
	Meteor.methods({
		CheckStatus: function () {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				let checkEmailExist = .pluck(Meteor.users.find({}, {fields: {'profile.email': 1, _id: 0}}).fetch(), 'profile.email');
				if (checkEmailExist) {
					let existEmailArray = [];
					checkEmailExist.forEach(function (emails) {
						existEmailArray.push(emails.profile.email);
					});
					let checksEmails = SchoolStudents.find({useremail: {$in: existEmailArray}}, {useremail: 1});
					if (checksEmails) {
						checksEmails.forEach(function (newEmails) {
							SchoolStudents.update(useremail, {$set: {status.active: true, status.activedate: new date()}});
						});
					}
				}	
			}
		}
	});
}*/