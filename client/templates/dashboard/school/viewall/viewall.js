Template.myviews.onRendered(function () {
	FlowRouter.reload();
});

Session.setDefault('skip', 0);
Tracker.autorun(function () {
	Meteor.subscribe('userSchools', Session.get('skip'));
});

Template.myviews.helpers({
	RenderSchool: function () {
		if(Meteor.userId()) {
		    if(Meteor.user().emails[0].verified) {
		        return SchoolDb.find({userId: Meteor.userId()}).fetch().reverse();
		    } else {
		    	FlowRouter.go('/');
		    	Bert.alert('Please verify your account to proceed', 'success', 'growl-top-right');
		    }
		}
	}
});

Template.myviews.events({
	'click .previous': function () {
		if (Session.get('skip') > 0 ) {
			Session.set('skip', Session.get('skip') - 5 );
		}
	},
	'click .next': function () {
		Session.set('skip', Session.get('skip') + 5 );
	}
});