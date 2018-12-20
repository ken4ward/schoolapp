Template.studentview.helpers({
	singleSchool(){
        let user = Meteor.user();
        if (user && user.emails.length > 0 ) {
            let userSchool = SchoolStudents.findOne({useremail: user.emails[0].address});
            if (userSchool && userSchool._id) {
                let schoolSelected = StudentSchool.findOne({studentId: userSchool._id});
                if (schoolSelected && schoolSelected.schoolId) {
                    let selectedStudentSchool = SchoolDb.findOne({_id: schoolSelected.schoolId});
                    if (selectedStudentSchool) {
                        return selectedStudentSchool;
                    }
                } 
            } 
        } 
    }, 
    modules(){
        let user = Meteor.user();
        if (user && user.emails.length > 0) {
            let userModule = SchoolStudents.findOne({useremail: user.emails[0].address});
            if (userModule && userModule._id) {
                let moduleSelected = StudentModule.find({studentId: userModule._id}).fetch();
                if (moduleSelected) {
                    let moduleIdArray = [];
                    moduleSelected.forEach(function (modulesId) {
                        moduleIdArray.push(modulesId.moduleId);
                    });
                    let studentModules = Modules.find({_id: {$in: moduleIdArray}}).fetch();
                    if (studentModules) {
                        return studentModules;
                    }
                }
            }
        }
    },	
    courses(){
        let user = Meteor.user();
        if (user && user.emails.length > 0) {
            let userCourse = SchoolStudents.findOne({useremail: user.emails[0].address});
            if (userCourse && userCourse._id) {
                let courseSelected = StudentModule.find({studentId: userCourse._id});
                if (courseSelected) {
                    let moduleIdArray = [];
                    courseSelected.forEach(function (modulesId) {
                         moduleIdArray.push(modulesId.moduleId);
                    });
                    let moduleCourse = CourseModules.find({moduleId: {$in: moduleIdArray}}, {coursesId: 1});
                    if (moduleCourse) {
                        let moduleCourseArray = [];
                        moduleCourse.forEach(function (coursesIds) {
                            moduleCourseArray.push(coursesIds.coursesId)
                        });
                        let coursesSelected = Courses.find({_id: {$in: moduleCourseArray}});
                        if (coursesSelected) {
                            return coursesSelected;
                        }
                    }
                }
            }
        }
    }, 
    courseMates() {
        let user = Meteor.user();
        if (user && user.emails.length > 0) {
            let userMate = SchoolStudents.findOne({useremail: user.emails[0].address});
            if (userMate && userMate._id) {
                let courseMateModule = StudentModule.find({studentId: userMate._id}, {moduleId: 1});
                if (courseMateModule) {
                    let moduleOfStudentsArrays = [];
                    courseMateModule.forEach(function (modulesIds) {
                        moduleOfStudentsArrays.push(modulesIds.moduleId);
                    });
                    let studentInModule = StudentModule.find({moduleId: {$in: moduleOfStudentsArrays}}, {studentId: 1});
                    if (studentInModule) {
                        let studentArray = [];
                        studentInModule.forEach(function (courseStudent) {
                            studentArray.push(courseStudent.studentId);
                        });
                        let studentMatesCourse = SchoolStudents.find({_id: {$in: studentArray}}).fetch();
                        if (studentMatesCourse) {
                            return studentMatesCourse;
                        }
                    }
                }
            }
        }
    }
});

Template.studentview.events({
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