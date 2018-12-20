Meteor.publish('userSchools', function (skipCount) {
  check(skipCount, Number);
  user = Meteor.users.findOne({_id:this.userId})
  if(user) {
      if(user.emails[0].verified) {
         return SchoolDb.find({userId: this.userId}, {limit: 5, skip: skipCount});
      } else {
         throw new Meteor.Error('Not authorized');
         return false;
      }
   }
});

Meteor.publish('allUserSchools', function () {
  user = Meteor.users.findOne({_id:this.userId})
  if(user) {
      if(user.emails[0].verified) {
        var adminSchool = SchoolDb.find({adminUsername: user.username}, {limit: 1});
        if (adminSchool) {
          return adminSchool;
        } else{
          return SchoolDb.find({userId: this.userId});
        }
      } else {
         throw new Meteor.Error('Not authorized');
         return false;
      }
   }
});

Meteor.publish('SingleSchool', function (schoolSlug) {
  check( schoolSlug, Match.OneOf( String, null, undefined ) );
  var user = Meteor.users.findOne({_id:this.userId});
  if(!user || !user.emails[0].verified) {
        throw new Meteor.Error('Not authorized');
    }else if (user.username) {
    var schoolAdmin = SchoolDb.find({adminUsername: user.username}, {limit: 1});
    if (schoolAdmin && schoolAdmin.adminUsername) {
      return SchoolDb.find({slug: schoolSlug, adminUsername: user.username}, {limit: 1});
    } else {
      return SchoolDb.find({slug: schoolSlug, userId: this.userId},{limit:1});
    }
  }
});

Meteor.publish('AllSchools', function () {
    let allSchools = SchoolDb.find();  
    if (allSchools) {
      return allSchools;
    } else {
      console.log('not published');
    }
});
