Template.schoolsidebar.helpers({
	SchoolLogo: function () {
		var myslug = FlowRouter.getParam('myslug');
		var imagepaths = SchoolDb.findOne({slug: myslug});
		if (imagepaths) {
			return imagepaths && imagepaths.imagepath; 
		}
	},

	SchoolDbId: function () {
		var myslug = FlowRouter.getParam('myslug');
		var shoolId = SchoolDb.findOne({slug: myslug});
		if (shoolId && shoolId._id) {
			return shoolId._id; 
		}
	},

	LoggedInser: function () {
		var whoLoggedIn = Meteor.user();
		if (whoLoggedIn && whoLoggedIn.username ) {
			var subscribedAdmin = Meteor.subscribe('AllSchools');
			if (subscribedAdmin) {
				var adminsUsername = SchoolDb.findOne({adminUsername: whoLoggedIn.username});
				if (adminsUsername) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
});

Template.schoolsidebar.events({
	'click .mySchoolId': function (event) {
	    event.preventDefault();

	    Session.setPersistent('recentSchoolId', trimInput($('#schoolId').val()));
	    var adminRecord = SchoolDb.findOne({_id: Session.get('recentSchoolId')});
	    if (adminRecord) {
	    	if (adminRecord.admin.personal.firstname == null) {
	    		FlowRouter.go('/admin/school');
	    	} else {
	    		FlowRouter.go('/viewadmin/school');
	    		//location.reload();
	    	}
	    }
	    //FlowRouter.go('/admin/school');
	},
	'click .schoolroute': function (event) {
	    event.preventDefault();

	    Session.setPersistent('recentSchoolId', trimInput($('#schoolId').val()));
	    var adminRecord = SchoolDb.findOne({_id: Session.get('recentSchoolId')});
	    if (adminRecord) {
	    	FlowRouter.go('/school/'+adminRecord.slug);
	    }
	    //FlowRouter.go('/admin/school');
	}
})