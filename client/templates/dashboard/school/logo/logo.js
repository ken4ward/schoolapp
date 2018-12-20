Template.logo.onRendered(function () {
  $('.addschoollogo').validate({
      rules: {
        selectschool: {
          required: true
        },
        uploads: {
          required: true,
        }
      },
      messages: {
        selectschool: {
          required: 'Select an option'
        },
        uploads: {
          required: 'Upload school logo',
        }
      }
  });
});

Template.logo.helpers({
 OnlyUsersSchool: function () {
    var subValues = Meteor.subscribe('allUserSchools');
    if (Meteor.userId() && subValues.ready()) {
      if (Meteor.user().emails[0].verified) {
        return SchoolDb.find({userId: Meteor.userId()}).fetch().reverse();
      } else {
        Bert.alert('Please verify your account to proceed', 'success', 'growl-top-right');
      }
    }
  }
});

Template.logo.events({
  'submit .addschoollogo': function (event, template) {
    event.preventDefault();

    var selectschoolId = trimInput(event.target.selectschool.value);

    //Extra curriculla activities
    var Academic = trimInput($('input[name=Academic]:checked').next().text());
    var Program = trimInput($('input[name=Program]:checked').next().text());
    var Cultural = trimInput($('input[name=Cultural]:checked').next().text());
    var Governing = trimInput($('input[name=Governing]:checked').next().text());
    var Leadership = trimInput($('input[name=Leadership]:checked').next().text());
    var Magazine = trimInput($('input[name=Magazine]:checked').next().text());
    var Community = trimInput($('input[name=Community]:checked').next().text());
    var Missionary = trimInput($('input[name=Missionary]:checked').next().text());
    var Theater = trimInput($('input[name=Theater]:checked').next().text());
    var Christian = trimInput($('input[name=Christian]:checked').next().text());
    var Environmental = trimInput($('input[name=Environmental]:checked').next().text());
    var Choreography = trimInput($('input[name=Choreography]:checked').next().text());
    var Entrepreneurship = trimInput($('input[name=Entrepreneurship]:checked').next().text());
    var Horticulture = trimInput($('input[name=Horticulture]:checked').next().text());
    var Debate = trimInput($('input[name=Debate]:checked').next().text());
    var Volunteer = trimInput($('input[name=Volunteer]:checked').next().text());
    console.log(Environmental);

    //School facilities
    var Libraries = trimInput($('input[name=Libraries]:checked').next().text());
    var ICT = trimInput($('input[name=ICT]:checked').next().text());
    var Play = trimInput($('input[name=Play]:checked').next().text());
    var Activity = trimInput($('input[name=Activity]:checked').next().text());
    var Auditorium = trimInput($('input[name=Auditorium]:checked').next().text());
    var Innovation = trimInput($('input[name=Innovation]:checked').next().text());
    var Facilities = trimInput($('input[name=Facilities]:checked').next().text());
    var Art = trimInput($('input[name=Art]:checked').next().text());
    var Music = trimInput($('input[name=Music]:checked').next().text());
    var Cafeteria = trimInput($('input[name=Cafeteria]:checked').next().text());
    var Store = trimInput($('input[name=Store]:checked').next().text());
    var Uniforms = trimInput($('input[name=Uniforms]:checked').next().text());
    var First = trimInput($('input[name=First]:checked').next().text());
    var Creative = trimInput($('input[name=Creative]:checked').next().text());
    var Multipurpose = trimInput($('input[name=Multipurpose]:checked').next().text());
    var Swimming = trimInput($('input[name=Swimming]:checked').next().text());
    console.log(Swimming);

    //image upload code
    

    if (isNotEmpty(selectschoolId)) {
      Meteor.call('ActivitiesFacilities', selectschoolId, Academic, Program, Cultural, Governing, Leadership, Magazine, Community, Missionary, 
       Theater, Christian, Environmental, Choreography, Entrepreneurship, Horticulture, Debate, Volunteer, Libraries, ICT, Play, 
       Activity, Auditorium, Innovation, Facilities, Art, Music, Cafeteria, Store, Uniforms, First, Creative, Multipurpose, Swimming, function (error, response) {
         if (error) {
          Bert.alert(error.reason, 'danger', 'growl-top-right');
          return false;
         } else {
          Bert.alert('Record updated successfully', 'success', 'growl-top-right');
         }
       });

      

      var file = $('#file-upload').get(0).files[0];
    if (file) {
      fsFile = new FS.File(file);

      SchoolLogos.insert(fsFile, function (error, response) {
        if (error) {
          return false;
          throw new Meteor.Error(error);
        }else{
          var imagepath = '/cfs/files/SchoolLogos/'+response._id;

          var schoolId = Session.get('schoolId');
          Meteor.call('SchoolLogoUploads', selectschoolId, imagepath, function (error, response) {
            if (error) {
              Bert.alert(error.reason, 'danger', 'growl-top-right');
              return false;
            }
            else{
              Bert.alert('Logo uploaded successfully', 'success', 'growl-top-right');
              var myslug = FlowRouter.getParam('myslug');
              FlowRouter.redirect('/school/myviews');
            }
          });
        }
      });

    }
  }
    return false;
  } 
});