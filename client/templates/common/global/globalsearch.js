Template.globalsearch.helpers({
  index: function () {
    return [
      CourseGlobalIndex, ModulesGlobalIndex, SchoolDbGlobalIndex, SchoolStudentsGlobalIndex
    ]
  },
  inputAttributes: function () {
    return { 'class': 'easy-search-input', 'placeholder': 'Start Search' };
  },

  //selection for each index
  selectedCourseName: function () {
    var courses = CourseGlobalIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedCourse") });
    return courses && courses.title;
  },
  selectedModuleName: function () {
    var modules = ModulesGlobalIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedModule") });
    return modules && modules.modulename;
  },
  selectedStudentName: function () {
    var student = SchoolStudentsGlobalIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedStudent") });
    return student && student.firstname;
  },
  selectedSchoolName: function () {
    var school = SchoolDbGlobalIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedSchool") });
    return school && school.addschoolname;
  },

  //Players for collections
  CoursePlayers: function () {
    return Courses.find({}, { sort: {dateCreated: -1} });
  },
  ModulePlayers: function () {
    return Modules.find({}, { sort: {createdAt: -1} });
  },
  StudentPlayers: function () {
    return SchoolStudents.find({}, { sort: {createdAt: -1} });
  },
  SchoolPlayers: function () {
    return SchoolDb.find({}, { sort: {createdAt: -1} });
  },

  //Count results
  resultsCount: function () {
    return [
      CourseGlobalIndex.getComponentDict().get('count'),
      ModulesGlobalIndex.getComponentDict().get('count'),
      SchoolStudentsGlobalIndex.getComponentDict().get('count'),
      SchoolDbGlobalIndex.getComponentDict().get('count')
    ]
  },

  showMore: function () {
    return false;
  },
  renderTempl: () => Template.renderTemplate
});



//Stdents templates 
Template.CourseGlobal.helpers({
  selected: function () {
    return Session.equals("selectedCourse", this.__originalId) ? "selected" : '';
  },
});
Template.CourseGlobal.events({
  'click': function () {
    Session.set("selectedCourse", this.__originalId);
  }
});

//Module templates 
Template.ModuleGlobal.helpers({
  selected: function () {
    return Session.equals("selectedModule", this.__originalId) ? "selected" : '';
  },
});
Template.ModuleGlobal.events({
  'click': function () {
    Session.set("selectedModule", this.__originalId);
  }
});

//Module templates 
Template.StudentGlobal.helpers({
  selected: function () {
    return Session.equals("selectedStudent", this.__originalId) ? "selected" : '';
  },
});
Template.StudentGlobal.events({
  'click': function () {
    Session.set("selectedStudent", this.__originalId);
  }
});

//School templates 
Template.SchoolGlobal.helpers({
  selected: function () {
    return Session.equals("selectedSchool", this.__originalId) ? "selected" : '';
  },
});
Template.SchoolGlobal.events({
  'click': function () {
    Session.set("selectedSchool", this.__originalId);
  }
});