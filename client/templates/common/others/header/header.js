Template.headertheme.events({
	"click #signup": function (event) {
		event.preventDefault();
		Meteor.setTimeout(function () {
			Modal.show('signup', null, {
				backdrop: 'static',
				keyboard: false
			});
		}, 100);
	},	

	"click #signin": function (event) {
		event.preventDefault();
			Meteor.setTimeout(function () {
				Modal.show('signin', null, {
			    backdrop: 'static',
			    keyboard: false
			});
		}, 100);
	},

	"click #signout": function (event) {
		event.preventDefault();
		Meteor.setTimeout(function () {
			Modal.show('signout', null, {
				backdrop: 'static',
				keyboard: false
			});
		}, 100);
	}, 
	'click #addschool':function () {
		event.preventDefault();
		FlowRouter.go('/school/basic');
	}
});

Template.headertheme.onRendered(function () {
	
});