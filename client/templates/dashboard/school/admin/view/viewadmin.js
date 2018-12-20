Template.viewadmin.helpers({
	schooladmin: function () {
		var schoolIdRecent = SchoolDb.findOne({_id: Session.get('recentSchoolId')});
	    if (schoolIdRecent) {
	    	return schoolIdRecent;
	    } else {
	    	console.warn('no record found');
	    }		
	},
});

Template.viewadmin.events({
	'click #updateadmin': function (event, template) {
		event.preventDefault();
		FlowRouter.go('/admin/school');
	}
});