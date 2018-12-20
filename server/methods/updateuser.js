if (Meteor.isServer) {
	Meteor.methods({
		CreateUserRecord: function (firstname, lastname, intMobile, num_street, facebook, geocomplete, 
			name, point_of_interest, lat, lng, location, location_type, formatted_address, bounds, viewport, route,
			street_number, postal_code, locality, sublocality, country, country_short, administrative_area_level_1, place_id,
			id, reference, url, website) {
			
			check(firstname, String); check(lastname, String); check(intMobile, String); check(num_street, String); check(facebook, String); 
			check(geocomplete, String); check(name, String); check(point_of_interest, String); check(lat, String); check(lng, String); 
			check(location, String); check(location_type, String); check(formatted_address, String); check(bounds, String);
			check(viewport, String); check(route, String); check(street_number, String); check(postal_code, String); check(locality, String);
			check(sublocality, String); check(country, String); check(country_short, String); check(administrative_area_level_1, String); check(place_id, String); 
			check(id, String); check(reference, String); check(url, String); check(website, String);

			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized', 'You must be logged in to add a new school!');
				return false;
			} else {
				var regUsername = Meteor.user().username;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				var day = new Date().getDate();
				var date = (month +"/" +day +"/" +year).toString();

				var profileIid = UserProfile.upsert({userId: Meteor.userId()},{
					
					//Address variables
					userId: Meteor.userId(), userFirstname: firstname, userlastname: lastname, usermobile: intMobile, usernum_street: num_street, userfacebook: facebook,
					addgeocomplete: geocomplete, addname: name, addpoint_of_interest: point_of_interest, addlat: lat, addlng: lng, addlocation: location,
					addlocation_type: location_type, addformatted_address: formatted_address, addbounds: bounds, addviewport: viewport, addroute: route,
					addstreet_number: street_number, addpostal_code: postal_code, addlocality: locality, addsublocality: sublocality, addcountry: country,
					addcountry_short: country_short, addadministrative_area_level_1: administrative_area_level_1, addplace_id: place_id, addid: id,
					addreference: reference, addurl: url, addwebsite: website, updatedAt: new Date(),

					//upload school logo image path
					userimage: null
				});
				return profileIid;
			}
		},
		UserImagesUpload: function (userId, userimage) {
			check(userId, String); check(userimage, String);
			if (!Meteor.userId()) {
				throw new Meteor.Error('Not authorized');
				return false;
			}else{
				UserProfile.update({userId: userId}, {$set: {userimage} });
			}
		}
	});
}