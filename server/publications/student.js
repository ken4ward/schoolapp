Meteor.publish('PaginatedStudents', function (skipCount) {
  check(skipCount, Number);
    user = Meteor.users.findOne({_id:this.userId});
    if(user) {
        if(user.emails[0].verified) {
           return SchoolStudents.find({userId: this.userId}, {limit: 5, skip: skipCount});
        } else {
           throw new Meteor.Error('Not authorized');
           return false;
        }
     }
});

Meteor.publish('DeleteStudents', function (studentId) {
  check(studentId, String);
    user = Meteor.users.findOne({_id:this.userId});
    if(user) {
        if(user.emails[0].verified) {
           return SchoolStudents.find({_id: studentId, userId: this.userId});
        } else {
           throw new Meteor.Error('Not authorized');
           return false;
        }
     }
});

Meteor.publish('AllStudents', function () {
    let allStudents = SchoolStudents.find();  
    if (allStudents) {
      return allStudents;
    } else {
      console.log('not published');
    }
});


//Search field .....
Meteor.publish( "mystudents", function( search ) {
  check( search, Match.OneOf( String, null, undefined ) );

  var query      = {};
      projection = { limit: 10, sort: { firstname: 1 } };

  if ( search ) {
    var regex = new RegExp( search, 'i' );

    query = {
      $or: [
        { firstname: regex },
        { lastname: regex },
        { class: regex }
      ]
    };

    projection.limit = 100;
  }
  return SchoolStudents.find( query, projection );
});