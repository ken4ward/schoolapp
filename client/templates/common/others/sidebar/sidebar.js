Template.sidebar.onRendered(function () {
	var instance = this;
	instance.autorun(function () {
		
	})
});

Template.sidebar.helpers({
	UserPicture: function () {
		var userimmages = UserProfile.findOne({}, {userId: Meteor.userId()});
		if (!userimmages) {
			console.warn('please upload image');
		} else {
			return userimmages.userimage;
		}
		
	}
});

Template.sidebar.events({
	'click #userview': function (events, template) {
		FlowRouter.go('/userview');
	}
});