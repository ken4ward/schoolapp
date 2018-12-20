if (Meteor.isClient) {
	Meteor.subscribe('NewSchoolDB');
	Meteor.subscribe('Users');
	Meteor.subscribe('SchoolLogo');
	Meteor.subscribe('SchoolLoogDBURL');
	Meteor.subscribe('SchoolDb');
	Meteor.subscribe('files.images.all');
	Meteor.subscribe('UserProfile');
	Meteor.subscribe('Courses');
	Meteor.subscribe('Modules');
	Meteor.subscribe('StudentModule');
	Meteor.subscribe('ModuleSchool');
	Meteor.subscribe('CourseModules');
	Meteor.subscribe('StudentSchool');
	Meteor.subscribe('DropdownSchool');
	Meteor.subscribe('AllStudents');
	Meteor.subscribe('AllSchools');
}