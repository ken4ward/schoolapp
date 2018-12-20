Meteor.publish('StudentModule', function () {
		if (!this.userId) {
			return false;
			throw new Meteor.Error('Not authorized');
		}else{
			return StudentModule.find();
		}
	});

