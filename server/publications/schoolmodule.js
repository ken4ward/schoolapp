Meteor.publish('ModuleSchool', function () {
	if (!this.userId) {
		return false;
		throw new Meteor.Error('Not authorized');
	}else{
		return ModuleSchool.find();
	}
});

