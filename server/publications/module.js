Meteor.publish('UserModules', function () {
	if (!this.userId) {
		return false;
		throw new Meteor.Error('Not authorized');
	}else{
		return Modules.find({"userId": this.userId});
	}
});

Meteor.publish('Modules', function () {
	if (!this.userId) {
		return false;
		throw new Meteor.Error('Not authorized');
	}else{
		return Modules.find();
	}
});

Meteor.publish('userModules', function (skipCount) {
	check(skipCount, Number);
  if (!this.userId) {
    throw new Meteor.Error('Not authorized');
    return false;
  } else {
    return Modules.find({userId: this.userId}, {limit: 5, skip: skipCount});
  }
});