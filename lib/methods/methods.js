if (Meteor.isServer) {
	Meteor.methods({
		SchoolRegister: function (newschoolname, newschoolmotto, newschholvision, sellschool, schooltype, 
			schoolfeerange, schoolcurriculum) {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			}else{
				var regUsername = Meteor.user().username;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				var day = new Date().getDate();
				var date = (month +"/" +day +"/" +year).toString();

	var schoolId =  NewSchoolDB.insert({
					newschoolnamevar: newschoolname,
					newschoolmottovar: newschoolmotto,
					newschholvisionvar: newschholvision,
					sellschoolvar: sellschool,
					schooltypevar: schooltype,
					schoolfeerangevar: schoolfeerange,
					schoolcurriculumvar: schoolcurriculum,
					date: date,
					createdAt: new Date(),
					author: regUsername,
					authorId: Meteor.userId(),
					phone: null,
					mobile: null,
					num_street: null,
					schoolemail: null,
					schoolwebsite: null,
					name: null,
					point_of_interest: null,
					lat: null,
					lng: null,
					location: null,
					location_type: null,
					formatted_address: null,
					bounds: null,
					viewport: null,
					route: null,
					street_number: null,
					postal_code: null,
					locality: null,
					sublocality: null,
					country: null, 
					country_short: null,
					administrative_area_level_1: null,
					place_id: null, 
					id: null,
					reference: null,
					url: null,
					website: null,
					imagepath: null,
					adminfirstname: null,
					adminlastname: null,
					adminmobile: null,
					adminemail: null,
					adminrelationship: null,
					posterfirstname: null,
					posterlastname: null,
					postermobile: null,
					posteremail: null,
					posterrelationship: null
				});
					return schoolId;
			}
		},

		SchoolContact: function (schoolId, phone, mobile, num_street, schoolemail, schoolwebsite, name, point_of_interest, lat, lng, 
			location, location_type, formatted_address, bounds, viewport, route, street_number, postal_code, locality, sublocality,
			country, country_short, administrative_area_level_1, place_id, id, reference, url, website) {
		    if (!Meteor.userId()) {
		        throw new Meteor.Error('Not authorized');
		        return false;
		    }else{
		        NewSchoolDB.update(schoolId, { $set: { phone, mobile, num_street, schoolemail, schoolwebsite, name, point_of_interest, lat, lng, 
									location, location_type, formatted_address, bounds, viewport, route, street_number, postal_code, locality, sublocality,
									country, country_short, administrative_area_level_1, place_id, id, reference, url, website } });
		    }
		}, 

		SchoolLogoUpload: function (schoolId, imagepath) {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				NewSchoolDB.update(schoolId, {$set: {imagepath} });
			}
		}, 

		//List of update to record
		VisionMisionUpdate: function (schoolId, newschoolmottovar, newschholvisionvar) {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				NewSchoolDB.update(schoolId, {$set: {newschoolmottovar, newschholvisionvar} });
			}
		},

		UpdateYear: function (schoolId, schooltypevar, schoolfeerangevar, schoolcurriculumvar) {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				NewSchoolDB.update(schoolId, {$set: {schooltypevar, schoolfeerangevar, schoolcurriculumvar}});
			}
		},

		AdminDetails: function (schoolId, adminfirstname, adminlastname, adminmobile, adminemail, adminrelationship) {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				NewSchoolDB.update(schoolId, {$set: {adminfirstname, adminlastname, adminmobile, adminemail, adminrelationship} });
			}
		},

		UpdateAdminDetails: function (schoolId, adminfirstname, adminlastname, adminmobile, adminemail, adminrelationship) {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				NewSchoolDB.update(schoolId, {$set: {adminfirstname, adminlastname, adminmobile, adminemail, adminrelationship} });
			}
		},

		PosterDetails: function (schoolId, posterfirstname, posterlastname, postermobile, posteremail, posterrelationship) {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				NewSchoolDB.update(schoolId, {$set: {posterfirstname, posterlastname, postermobile, posteremail, posterrelationship} });
			}
		},

		UpdatePosterDetails: function (schoolId, posterfirstname, posterlastname, postermobile, posteremail, posterrelationship) {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				NewSchoolDB.update(schoolId, {$set: {posterfirstname, posterlastname, postermobile, posteremail, posterrelationship} });
			}
		},

		UpdateSellSchool: function (schoolId, sellschoolvar) {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				NewSchoolDB.update(schoolId, {$set: {sellschoolvar} });
			}
		},

		UserRecords: function () {
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			}else{
				//var UserDocuments = NewSchoolDB.find({authorId: Meteor.userId()}).count();
					return NewSchoolDB.find({}, {authorId: Meteor.userId()});
			}
		}
	});
}