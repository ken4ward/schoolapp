Template.moduleschool.helpers({
	courses(){
    	var myslug = FlowRouter.getParam('myslug');
        var mySchoolDoc = SchoolDb.findOne({slug: myslug});
        var arrayModuleSchool = ModuleSchool.find({schoolId: mySchoolDoc._id});
        // Transform the array of document into an array with only the ids
        var arrayModuleIds = [];
        arrayModuleSchool.forEach(function(moduleSchool){
            arrayModuleIds.push(moduleSchool.moduleId);
        });
        return Modules.find({_id: {$in: arrayModuleIds}}).fetch();
    }
});