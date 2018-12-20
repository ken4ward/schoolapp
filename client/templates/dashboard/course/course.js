Template.courses.onCreated(function () {
  var template = Template.instance();

});

Template.courses.helpers({
  inputAttributes: function () {
    return {'class': 'easy-search-input', 'placeholder': 'Search For Courses'};
  },

  players: function () {
    return Courses.find({createdById: Meteor.userId()}, {sort: {dateCreated: -1} });
  }, 

  selectedName: function () {
    var courses = CourseIndex.config.mongoCollection.findOne({__originalId: Session.get('selectedCourse')});
    return courses && courses.title;
  },

  index: function () {
    return CourseIndex;
  },

  resultCount: function () {
    return CourseIndex.getComponentDict().get('count');
  }, 

  showMore: function () {
    return false;
  },
  renderTempl: function () {
    Template.renderTemplate
  }
});

Template.User.helpers({
  selected: function () {
    return Session.equals('selectedCourse', this.__originalId) ? 'selected' : '';
  }
});

Template.User.events({
  'click': function () {
    Session.set('selectedCourse', this.__originalId);
  }
});

Template.courses.events({

  "click #add-course-to-module": function (event) {
    event.preventDefault();
    Modal.show('dialogmodule');
  },

  'change [type=checkbox]': function(event, template){
    event.preventDefault();
    var mySelectedCourses = $('input:checkbox[name="eachcourses"]:checked').map(function () {
      return $(this).val()}).get();
    Session.set('selectedCourses', mySelectedCourses);
     console.log(Session.get('selectedCourses'));
  }, 

  'change #performaction': function (event, template) {
      event.preventDefault();
    
      var selectedText = template.$('#performaction').val();
      
      if (selectedText === "addtomodule") {
         Modal.show('dialogmodule');
      }
      if (selectedText === 'addnewcourse') {
         Bert.alert('Please link to course web', 'danger', 'growl-top-right');
      }
      if (selectedText === 'batchdelete') {
        let mySelectedCourses = Session.get('selectedCourses');
        if (isNotEmpty(mySelectedCourses) && arrayIsEmpty(mySelectedCourses)) {
          Meteor.call('CoursesBatchDelete', mySelectedCourses, function (error, response) {
            if (error) {
              Bert.alert(error.reason, 'danger', 'growl-top-right');
              return false;
            } else {
              Bert.alert('Students are successfully deleted', 'success', 'growl-top-right');
            }
          });
        }
      }
  }, 

  'click .delete': function (event, template) {
      event.preventDefault();
      let mySelectedCourses = Session.get('selectedCourses');
      console.log(mySelectedCourses[0].replace(/[""{}\s]/g, ''));
      if (isNotEmpty(mySelectedCourses)) {
         let courseId = mySelectedCourses[0].replace(/[""{}\s]/g, '');
         Meteor.call('DeleteSingleCourse', courseId, function (error, response) {
           if (error) {
            Bert.alert(error.reason, 'danger', 'growl-top-right');
            return false;
           } else {
            Bert.alert('Course successfully removed', 'growl-top-right');
           }
         });
         return false;
      }
  }
});
