Template.studentsview.helpers({
	singleStudent: function () {
        let studentslug = FlowRouter.getParam('studentslug');
        if (studentslug) {
           let students = SchoolStudents.findOne({slug: studentslug});
            if (students) {
                return students;
            }
        }
    },
    schools(){
        let studentslug = FlowRouter.getParam('studentslug');
        if (studentslug) {
            let students = SchoolStudents.findOne({slug: studentslug});
            if (students) {
                let studentSchool = StudentSchool.findOne({studentId: students._id});
                if (studentSchool && studentSchool.schoolId) {
                    let schoolOfStudent = SchoolDb.findOne({_id: studentSchool.schoolId});
                    if (schoolOfStudent && schoolOfStudent.addschoolname) {
                        return schoolOfStudent.addschoolname;
                    }

                }
            }
        }
    },
	modules(){
        let studentslug = FlowRouter.getParam('studentslug');
        if (studentslug) {
            let studentsIds = SchoolStudents.findOne({slug: studentslug});
            if (studentsIds) {
                 let studentModule = StudentModule.find({studentId: studentsIds._id}, {moduleId: 1});
                if (studentModule) {
                    let arraymoduleIds = [];
                    studentModule.forEach(function (modulesId) {
                        arraymoduleIds.push(modulesId.moduleId);
                    });
                    let modulesSelected = Modules.find({_id: {$in: arraymoduleIds}}).fetch();
                    if (modulesSelected) {
                        return modulesSelected;
                    }
                }
            }
        }
    }, 
    courses(){
    	let studentslug = FlowRouter.getParam('studentslug');
        if (studentslug) {
             let studentsIds = SchoolStudents.findOne({slug: studentslug});
            if (studentsIds) {
                let studentModules = StudentModule.find({studentId: studentsIds._id}, {moduleId: 1});
                if (studentModules) {
                    let arraymoduleIds = [];
                    studentModules.forEach(function (modulesId) {
                        arraymoduleIds.push(modulesId.moduleId);
                    });
                    let courseSelected = CourseModules.find({moduleId: {$in: arraymoduleIds}}, {coursesId: 1});
                    if (courseSelected) {
                        let coursesArray = [];
                        courseSelected.forEach(function (coursesIds) {
                            coursesArray.push(coursesIds.coursesId);
                        });
                        let coursesSelected = Courses.find({_id: {$in: coursesArray}}).fetch();
                        if (coursesSelected) {
                            return coursesSelected;
                        }
                    }
                }
            }
        }
    }
});

Template.studentsview.events({
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