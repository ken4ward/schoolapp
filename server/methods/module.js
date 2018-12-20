if (Meteor.isServer) {
	Meteor.methods({
		AddModule: function (modulename, moduledescription) {
			check(modulename, String); check(moduledescription, String);
			if (!this.userId) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			}else {
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				var day = new Date().getDate();
				var date = (month +"/" +day +"/" +year).toString();

				var moduleId =  Modules.insert({
					modulename: modulename,
					moduledescription: moduledescription,
					userId: Meteor.userId(),
					createdAt: new Date(),
					date: date
				});
				return moduleId;
			}
		},

		DeleteModule: function (moduleId) {
			check(moduleId, String);
			if (!this.userId) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				Modules.remove(moduleId);
			}
		}, 
		RemoveModuleFromSchool: function (moduleslug) {
			check(moduleslug, String);
			if (!this.userId) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				ModuleSchool.remove(moduleslug);
			}
		}
	});
}