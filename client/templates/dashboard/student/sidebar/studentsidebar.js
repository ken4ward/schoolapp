Template.studentsidebar.onRendered(function () {
	var instance = this;
	instance.autorun(function () {
		
	})
});

Template.studentsidebar.helpers({
	StudentPicture: function () {
		var userimmages = UserProfile.findOne({userId: Meteor.userId()});
		if (!userimmages) {
			console.warn('please uplas image');
		} else {
			return userimmages && userimmages.userimage;
		}
		
	}
})