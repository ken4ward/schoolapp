      
Template.student.onCreated(function () {
  Template.instance().uploading = new ReactiveVar( false );
  this.autorun(function () {
    Session.setDefault('mySelectedStudents', '');
  });
});

Template.student.helpers({
  uploading: function () {
    return Template.instance().uploading.get();
  },
  inputAttributes: function () {
    return {'class': 'easy-search-input', 'placeholder': 'Search Anything'};
  },

  players: function () {
    return SchoolStudents.find({'userId': Meteor.userId()}, {sort: {createdAt: -1} });
  }, 

  selectedName: function () {
    var students = SchoolStudentsIndex.config.mongoCollection.findOne({__originalId: Session.get('selectedStudents')});
    return students && students.firstname;
  },

  index: function () {
    return SchoolStudentsIndex;
  },

  resultCount: function () {
    return SchoolStudentsIndex.getComponentDict().get('count');
  }, 

  showMore: function () {
    return false;
  },
  renderTempl: function () {
    Template.renderTemplate
  }
});

Template.UserStudents.helpers({
  selected: function () {
    let selectedVar = Session.equals('selectedStudents', this.__originalId) ? 'selected' : '';
    if (selectedVar) {
      return selectedVar;
    }
  }
});

Template.UserStudents.events({
  'click': function () {
    Session.set('selectedStudents', this.__originalId);
  }
});

Template.student.events({
  'keyup [name="search"]': function (event, template) {
    let value = event.target.value.trim();

    if (value !== '' && event.keyCode === 13 ) {
      template.searchQuery.set(value);
      template.searching.set(true);
    }

    if (value === '') {
      template.searchQuery.set(value);
    }
  },
  'change [name="uploadCSV"]': function (event, template) {
   template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'StudentUpload', results.data, ( error, response ) => {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
          }
        });
      }
    });
  },
  'change [type=checkbox]': function(event, template){
    event.preventDefault();

    var mySelectedStudents = $('input:checkbox[name="eachstudents"]:checked').map(function () {
      return $(this).val()}).get();
    Session.setPersistent('mySelectedStudents', mySelectedStudents);
     console.log(Session.get('mySelectedStudents'));
  },
  'change #performaction': function (event, template) {
      event.preventDefault();
    
      var selectedText = template.$('#performaction').val();
      if (selectedText === "InviteStudents") {
        Meteor.call('BatchMassMail', function (error, response) {
          if (error) {
            Bert.alert(error.reason, 'danger', 'growl-top-right');
            return false;
          } else {
            Bert.alert('Invitation successfully sent to students', 'success', 'growl-top-right');
          }
        })
      }
      if (selectedText === "AddStudentModule") {
         Modal.show('studentdialog');
      }
      if (selectedText === 'AddStudentsSchool') {
         Modal.show('schoolstudent');
      }
      if (selectedText === "UploadStudents") {
          $("#uploadCSV").trigger('click', function () {
            template.uploading.set( true );

            Papa.parse( event.target.files[0], {
              header: true,
              complete( results, file ) {
                Meteor.call( 'StudentUpload', results.data, ( error, response ) => {
                  if ( error ) {
                    console.log( error.reason );
                  } else {
                    template.uploading.set( false );
                    Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
                  }
                });
              }
            });
          });
      } if (selectedText === "DeleteStudents") {
        let mySelectedStudents = Session.get('mySelectedStudents');
        if (isNotEmpty(mySelectedStudents) && arrayIsEmpty(mySelectedStudents)) {
          Meteor.call('StudentBatchDelete', mySelectedStudents, function (error, response) {
            if (error) {
              Bert.alert(error.reason, 'danger', 'growl-top-right');
              return false;
            } else {
              Bert.alert('Students are successfully deleted', 'success', 'growl-top-right');
            }
          });
        }
         return false;
      }
  }, 

  'click .delete': function (event, template) {
      event.preventDefault();
      let mySelectedStudents = Session.get('mySelectedStudents');
      console.log(mySelectedStudents[0].replace(/[""{}\s]/g, ''));
      if (isNotEmpty(mySelectedStudents)) {
         let studentId = mySelectedStudents[0].replace(/[""{}\s]/g, '');
         Meteor.call('DeleteSingleStudent', studentId, function (error, response) {
           if (error) {
            Bert.alert(error.reason, 'danger', 'growl-top-right');
            return false;
           } else {
            Bert.alert('Student successfully removed', 'growl-top-right');
           }
         });
         return false;
      }
  }
});