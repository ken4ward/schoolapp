Meteor.publish('SchoolLogos', function () {
	if (!this.userId) {
		throw new Meteor.Error('Not authorized');
		return false;
	}
	return SchoolLogos.find();
});

Meteor.publish('SchoolLoogDBURLs', function () {
	if (!this.userId) {
		throw new Meteor.Error('Not authorized');
		return false;
	}
	return SchoolLoogDBURLs.find();
});