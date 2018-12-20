if (Meteor.isServer) {
	Meteor.methods({
		RegisterSchool: function (conventional, registered, schoolname, schoolmotto, schoolmission, schoolvision, schooltype, feerange, curriculum) {
			check(conventional, String); check(registered, String); check(schoolname, String); check(schoolmotto, String); 
			check(schoolmission, String); check(schoolvision, String); check(schooltype, String); check(feerange, String); check(curriculum, String);
			
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				var regUsername = Meteor.user().username;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				var day = new Date().getDate();
				var date = (month +"/" +day +"/" +year).toString();

				var schoolId = SchoolDb.insert({
					addconventional: conventional, addschoolname: schoolname, addschoolmotto: schoolmotto, addschoolmission: schoolmission, userId: Meteor.userId(),
					addschoolvision: schoolvision, addschooltype: schooltype, addfeerange: feerange, addcurriculum: curriculum, date: date, createdAt: new Date(), adminUsername: Random.id(12),

					//Address variables
					addUnit: null, addbranches: null, addemail: null, addphone: null, addmobile: null, addnum_street: null, addschoolwebiste: null,
					addgeocomplete: null, addname: null, addpoint_of_interest: null, addlat: null, addlng: null, addlocation: null,
					addlocation_type: null, addformatted_address: null, addbounds: null, addviewport: null, addroute: null,
					addstreet_number: null, addpostal_code: null, addlocality: null, addsublocality: null, addcountry: null,
					addcountry_short: null, addadministrative_area_level_1: null, addplace_id: null, addid: null,
					addreference: null, addurl: null, addwebsite: null, updatedAt: new Date(),

					//upload school logo image path
					imagepath: null,

					//facilities and extra curricula
					addAcademic: null, addProgram: null, addCultural: null, addGoverning: null, addLeadership: null, addMagazine: null, addCommunity: null, addMissionary: null, 
       				addTheater: null, addChristian: null, addEnvironmental: null, addChoreography: null, addEntrepreneurship: null, addHorticulture: null, addDebate: null, addVolunteer: null, addLibraries: null, addICT: null, addPlay: null, 
       				addActivity: null, addAuditorium: null, addInnovation: null, addFacilities: null, addArt: null, addMusic: null, addCafeteria: null, addStore: null, addUniforms: null, addFirst: null, addCreative: null, addMultipurpose: null, addSwimming: null,

       				//admin details
       				admin: {
       					personal: {
       						relationship: null, worksat: null, firstname: null, lastname: null, email: null, mobile: null, phone: null, social: null
       					},
       					address:{
							num_street: null, geocomplete: null, name: null, point_of_interest: null, lat: null, lng: null, location: null,
							location_type: null, formatted_address: null, bounds: null, viewport: null, route: null, street_number: null, postal_code: null, locality: null, sublocality: null, country: null,
							country_short: null, administrative_area_level_1: null, place_id: null, id: null, reference: null, url: null, website: null, updatedAt: new Date()
       					}, 
       					status: {
       						active: 0,
       						activedate: null
       					}
       				}
				});
				return schoolId;
			}
		},

		SchoolAddress: function (selectschoolId, unit, branches, email, phone, mobile, num_street, schoolwebiste, geocomplete, 
			name, point_of_interest, lat, lng, location, location_type, formatted_address, bounds, viewport, route,
			street_number, postal_code, locality, sublocality, country, country_short, administrative_area_level_1, place_id,
			id, reference, url, website) {
			check(selectschoolId, String); check(unit, String); check(branches, String); check(email, String); check(phone, String); check(mobile, String);
			check(num_street, String); check(schoolwebiste, String); check(geocomplete, String); check(name, String); check(point_of_interest, String);
			check(lat, String); check(lng, String); check(location, String); check(location_type, String); check(formatted_address, String); check(bounds, String);
			check(viewport, String); check(route, String); check(street_number, String); check(postal_code, String); check(locality, String);
			check(sublocality, String); check(country, String); check(country_short, String); check(administrative_area_level_1, String); check(place_id, String); 
			check(id, String); check(reference, String); check(url, String); check(website, String);
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
		        return false;
			} else {
				SchoolDb.update(selectschoolId, {$set: {unit, branches, email, phone, mobile, num_street, schoolwebiste, geocomplete, 
				name, point_of_interest, lat, lng, location, location_type, formatted_address, bounds, viewport, route,
				street_number, postal_code, locality, sublocality, country, country_short, administrative_area_level_1, place_id,
				id, reference, url, website}});
			}
		}, 

		ActivitiesFacilities: function (selectschoolId, Academic, Program, Cultural, Governing, Leadership, Magazine, Community, Missionary, 
       		Theater, Christian, Environmental, Choreography, Entrepreneurship, Horticulture, Debate, Volunteer, Libraries, ICT, Play, 
       		Activity, Auditorium, Innovation, Facilities, Art, Music, Cafeteria, Store, Uniforms, First, Creative, Multipurpose, Swimming) {
			check(selectschoolId, String); check(Academic, String); check(Program, String); check(Cultural, String); check(Governing, String); check(Leadership, String);
			check(Magazine, String); check(Community, String); check(Missionary, String); check(Theater, String); check(Christian, String);
			check(Environmental, String); check(Choreography, String); check(Entrepreneurship, String); check(Horticulture, String); check(Debate, String); check(Volunteer, String);
			check(Libraries, String); check(ICT, String); check(Play, String); check(Activity, String); check(Auditorium, String); check(Innovation, String);
			check(Facilities, String); check(Art, String); check(Music, String); check(Cafeteria, String); check(Store, String);
			check(Uniforms, String); check(First, String); check(Creative, String); check(Multipurpose, String); check(Swimming, String); 
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			} else {
				SchoolDb.update(selectschoolId, {$set: {Academic, Program, Cultural, Governing, Leadership, Magazine, Community, Missionary, 
       		Theater, Christian, Environmental, Choreography, Entrepreneurship, Horticulture, Debate, Volunteer, Libraries, ICT, Play, 
       		Activity, Auditorium, Innovation, Facilities, Art, Music, Cafeteria, Store, Uniforms, First, Creative, Multipurpose, Swimming} });
			}
		},

		SchoolLogoUploads: function (selectschoolId, imagepath) {
			check(selectschoolId, String); check(imagepath, String);
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				SchoolDb.update(selectschoolId, {$set: {imagepath} });
			}
		},

		getSingleSchool:function(schoolSlug) {
	        check(schoolSlug, String);
	        return SchoolDb.findOne({ slug: schoolSlug, userId: {$lt: this.userId}});
	    },

	    AdminSchoolUpdate: function (schoolIdRecent, relationship, worksat, firstname, lastname, email, mobile, phone, social, num_street, geocomplete, country, 
			name, point_of_interest, lat, lng, location, location_type, formatted_address, bounds, viewport, route, street_number, 
			postal_code, locality, sublocality, country_short, administrative_area_level_1, place_id, id, reference, url, website ) {
	    	check(schoolIdRecent, String); check(relationship, String); check(worksat, String); check(firstname, String); check(lastname, String); check(social, String);
	    	check(email, String); check(mobile, String); check(phone, String); check(num_street, String); check(geocomplete, String); check(country, String); 
	    	check(name, String); check(point_of_interest, String); check(bounds, String); check(lng, String); check(location, String); check(lat, String);
	    	check(location_type, String); check(formatted_address, String); check(viewport, String); check(route, String); check(street_number, String); 
	    	check(postal_code, String); check(locality, String); check(sublocality, String); check(country_short, String); check(administrative_area_level_1, String); check(place_id, String); 
	    	check(id, String); check(reference, String); check(url, String); check(website, String);

	    	var schoolDetails =  SchoolDb.findOne({_id: schoolIdRecent});
	    	
	    	if (schoolDetails && schoolDetails.userId) {
	    		if (Meteor.userId() === schoolDetails.userId) {
	    			SchoolDb.update(schoolIdRecent, {$set: {'admin.personal.relationship': relationship, 'admin.personal.worksat': worksat, 'admin.personal.firstname': firstname, 
	    			'admin.personal.lastname': lastname, 'admin.personal.email': email, 'admin.personal.mobile': mobile, 'admin.personal.phone': phone, 'admin.personal.social': social,
	    			'admin.address.num_street': num_street, 'admin.address.geocomplete': geocomplete, 'admin.address.country': country, 'admin.address.name': name,
	    			'admin.address.point_of_interest': point_of_interest, 'admin.address.lat': lat, 'admin.address.lng': lng, 'admin.address.location': location,
	    			'admin.address.location_type': location_type, 'admin.address.formatted_address': formatted_address, 'admin.address.bounds': bounds,
	    			'admin.address.viewport': viewport, 'admin.address.route': route, 'admin.address.street_number': street_number, 'admin.address.postal_code': postal_code,
	    			'admin.address.locality': locality, 'admin.address.sublocality': sublocality, 'admin.address.country_short': country_short, 'admin.address.administrative_area_level_1': administrative_area_level_1,
	    			'admin.address.place_id': place_id, 'admin.address.id': id, 'admin.address.reference': reference, 'admin.address.url': url, 'admin.address.website': website } });
	    		} else {
	    			throw new Meteor.Error('Not authorized');
					return false;
	    		}
	    	}
	    }
	});
}