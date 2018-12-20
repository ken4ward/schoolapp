Template.moduleview.helpers({
	singleModule: function () {
        let moduleslug = FlowRouter.getParam('moduleslug');
        if (moduleslug) {
           let modules = Modules.findOne({slug: moduleslug});
            if (modules) {
                return modules;
            }
        }
    },
	courses(){
        let moduleslug = FlowRouter.getParam('moduleslug');
        if (moduleslug) {
            let modulesId = Modules.findOne({slug: moduleslug});
            if (modulesId) {
                let moduleCourse = CourseModules.find({moduleId: modulesId._id}, {coursesId: 1});
                if (moduleCourse) {
                    let arraymoduleIds = [];
                    moduleCourse.forEach(function (coursesIds) {
                        arraymoduleIds.push(coursesIds.coursesId);
                    });
                    let coursesSelected = Courses.find({_id: {$in: arraymoduleIds}});
                    if (coursesSelected) {
                        return coursesSelected;
                    }
                }
            }
        }
    }, 
    
    students(){
    	let moduleslug = FlowRouter.getParam('moduleslug');
        if (moduleslug) {
             let modulesId = Modules.findOne({slug: moduleslug});
            if (modulesId) {
                let studentModules = StudentModule.find({moduleId: modulesId._id}, {studentId: 1});
                if (studentModules) {
                    let studentModuleArray = [];
                    studentModules.forEach(function (studentsIds) {
                        studentModuleArray.push(studentsIds.studentId);
                    });
                    let studentsSelected = SchoolStudents.find({_id: {$in: studentModuleArray}});
                    if (studentsSelected) {
                        return studentsSelected;
                    }
                }
            }
        }
    }
});

Template.view.events({
	'click #editschool': function (event) {
		event.preventDefault();
		var posterId = SchoolDb.findOne({userId: Meteor.userId()});
		if (!posterId && posterId === null) {
			Bert.alert('User has not posted anthing yet....', 'danger', 'growl-top-right');
		}else {
			FlowRouter.redirect('/school/basic/edit')
		}	
	}
});

/*Template.view.onCreated(function () {
	var instance = this;
	instance.autorun(function () {
		var slug = FlowRouter.getParam('myslug');
		SingleSchool.findOne({}, {slug: slug});
	});
})*/