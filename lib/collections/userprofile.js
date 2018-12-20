UserProfile = new Mongo.Collection('userprofile');

UserProfile.allow({
	insert: ()=> false,
	update: ()=> false,
	remove: ()=> false
});

UserProfile.deny({
	insert: ()=> true,
	update: ()=> true,
	remove: ()=> true
});

UserProfile.friendlySlugs(
  {
    slugFrom: 'firstname',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);