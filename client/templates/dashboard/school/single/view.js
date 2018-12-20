Session.setDefault('skip', 0);
Tracker.autorun(function () {
    Meteor.subscribe('PaginatedStudents', Session.get('skip'));
});
Template.view.onCreated(function () {
    Session.setPersistent('ReceivedSlug', FlowRouter.getParam('myslug'));
    this.autorun(function () {
        Meteor.subscribe('SingleSchool', Session.get('ReceivedSlug'));
    });
});

Template.view.onRendered(function () {
    FlowRouter.reload();
});

Template.view.helpers({
	singleSchool: function () {
        if (Meteor.userId()) {
            let userSchool = SchoolDb.findOne({slug: trimInput(Session.get('ReceivedSlug'))});
            if (!userSchool) {
                Bert.alert('School not present', 'danger', 'growl-top-right');
            } else {
                return userSchool;
            }
        }	
	},
	modules(){
        let myslug = trimInput(Session.get('ReceivedSlug'));
        if (myslug) {
            let mySchoolDoc = SchoolDb.findOne({slug: myslug});
            if (mySchoolDoc) {
                let arrayModuleSchool = ModuleSchool.find({schoolId: mySchoolDoc._id});
                if (arrayModuleSchool) {
                    var arrayModuleIds = [];
                    arrayModuleSchool.forEach(function(moduleSchool){
                        arrayModuleIds.push(moduleSchool.moduleId);
                    });
                }
                return Modules.find({_id: {$in: arrayModuleIds}}).fetch();
            }
        } 
    }, 
    courses(){
    	var courseslug = trimInput(Session.get('ReceivedSlug'));
        if (courseslug) {
            var mySchoolDocs = SchoolDb.findOne({slug: courseslug});
            if (mySchoolDocs) {
                var arrayModuleSchools = ModuleSchool.find({schoolId: mySchoolDocs._id});
                // Transform the array of document into an array with only the ids
                var arrayModuleId = [];
                arrayModuleSchools.forEach(function(moduleSchools){
                    arrayModuleId.push(moduleSchools.moduleId);
                });
                var coursesToModules = CourseModules.find({moduleId: {$in: arrayModuleId}}).fetch();
                if (coursesToModules) {
                    coursesArrayIds = [];
                    coursesToModules.forEach(function (coursesModules) {
                        coursesArrayIds.push(coursesModules.coursesId);
                    });
                    return Courses.find({_id: {$in: coursesArrayIds}}).fetch();
                }
            }
        }
    },
    students(){
	    let myslug = trimInput(Session.get('ReceivedSlug'));
        if (myslug) {
            let mySchoolDoc = SchoolDb.findOne({slug: myslug});
            if (mySchoolDoc) {
                let arrayModuleSchool = StudentSchool.find({schoolId: mySchoolDoc._id});
                if (arrayModuleSchool) {
                    var arrayStudentIds = [];
                    arrayModuleSchool.forEach(function(studentSchool){
                       arrayStudentIds.push(studentSchool.studentId);
                    });
                    return SchoolStudents.find({userId: Meteor.userId(), _id: {$in: arrayStudentIds}}).fetch();
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
	},

    'click #removemodule': function (event, template) {
        event.preventDefault();
        console.log(this._id);
        let moduleslug = trimInput(event.target.moduleslug.value);
        let posterId = Modules.findOne({userId: Meteor.userId()});
        if (!posterId && posterId === null) {
            Bert.alert('You are not allowed', 'danger', 'growl-top-right');
        } else {
            if (isNotEmpty(moduleslug)) {
                Meteor.call('RemoveModuleFromSchool', moduleslug, function (error, response) {
                    if (error) {
                        Bert.alert(error.reason, 'danger', 'growl-top-right');
                        return false;
                    } else {
                        Bert.alert('Module successfully removed from this school', 'success', 'growl-top-right');
                    }
                });
            }
        }
    },

    'click .previous': function () {
        if (Session.get('skip') > 0 ) {
            Session.set('skip', Session.get('skip') - 3 );
        }
    },
    'click .next': function () {
        Session.set('skip', Session.get('skip') + 3 );
    },

    'change [type=checkbox]': function(event, template){
        event.preventDefault();
        var mySelectedStudents = $('input:checkbox[name="eachstudents"]:checked').map(function () {
          return $(this).val()}).get();
        Session.setPersistent('mySelectedStudents', mySelectedStudents);
         console.log(Session.get('mySelectedStudents'));
    },

    'click .delete':function (event, template) {
        event.preventDefault();

        let myslug = trimInput(Session.get('ReceivedSlug'));
        var mySelectedStudents = Session.get('mySelectedStudents');
        var RetrieveduserId = SchoolDb.findOne({slug: myslug});
            
        if (!RetrieveduserId && !RetrieveduserId.userId) {
            Bert.alert('No school available', 'danger', 'growl-top-right');
            return false;
        } else if(isNotEmpty(RetrieveduserId.userId) && isNotEmpty(mySelectedStudents) && arrayIsEmpty(mySelectedStudents)) {
            console.log(RetrieveduserId.userId);
            var myUserId = RetrieveduserId.userId;
            Meteor.call('DeleteStudentToSchool', myUserId, mySelectedStudents, function (error, response) {
                if (error) {
                    Bert.alert(error.reason, 'danger', 'growl-top-right');
                    return false;
                } else {
                    Session.set('studentSchoolId', response);
                    Bert.alert('Details updated successfully', 'success', 'growl-top-right');
                    console.log(response);
                    FlowRouter.go('/school/' +myslug);
                }
            })
        } else {
            console.log('well done');
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