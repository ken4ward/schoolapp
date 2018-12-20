Meteor.publish('UserProfile', function () {
		if (!this.userId) {
			return false;
			throw new Meteor.Error('Not authorized');
		}else{
			return UserProfile.find();
		}
	});