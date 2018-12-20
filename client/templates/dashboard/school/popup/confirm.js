Template.confirm.events({
	'click .continue': function (event) {
		event.preventDefault();
		FlowRouter.go('/address/school');	
		FlowRouter.reload();
		Modal.hide('confirm');
	},
	'click .gotoschoolpage': function (event) {
		event.preventDefault();
		var schoolId = Session.get('schoolId');
		var schoolData = SchoolDb.findOne({_id: schoolId});
		var myslug = schoolData.slug;
		FlowRouter.go('/school/'+myslug);
		Modal.hide('confirm');
	}
});