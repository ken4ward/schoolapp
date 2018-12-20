
Template.schooladmin.onRendered(function () {
	$('.addschooladdress').validate({
		rules: {
			firstname: {
				required: true,
				minlength: 2,
				maxlength: 30
			},
			lastname: {
				required: true,
				minlength: 2,
				maxlength: 30
			},
			relationship: {
				required: true
			},
			worksat: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			mobile: {
				required: true
			},
			num_street: {
				required: true,
				minlength: 10,
				maxlength: 100
			},
			geocomplete: {
				required: true
			}
		},
		messages:{
			relationship: {
				required: 'Select an option'
			},
			worksat: {
				required: 'Select an option'
			},
			branches: {
				required: 'Select an option'
			}
		}
	});

	Meteor.setTimeout(function () {

		$(function () {
			var input = $("#phone");
            $("#phone").intlTelInput({
			  nationalMode: true,
	 		  utilsScript: "/compatibility/6utils.js" // just for formatting/placeholders etc
			});

			$("#mobile").intlTelInput({
			 	nationalMode: true,
	  		 	utilsScript: "/compatibility/6utils.js" // just for formatting/placeholders etc
			});

            $("#geocomplete").geocomplete({
	          details: "form",
	          types: ["geocode", "establishment"],
	        });
			
	        $("#find").click(function(){
	          $("#geocomplete").trigger("geocode");
	        });
    	});
	}, 2000);
		FlowRouter.reload();
});

var studentEmailExist = function (usersemail) {
	let testing = SchoolStudents.findOne({useremail: usersemail});
	if (testing && testing.useremail) {
		return 'not available';
	} else {
		return usersemail;
	}
}

Template.schooladmin.events({
	'submit .schooladmin': function (event, template) {
		event.preventDefault();

		var schoolIdRecent = Session.get('recentSchoolId');
	    var relationship  = $("#relationship :selected").text();
		var worksat 	  = $("#worksat :selected").text();
		var firstname 	  = trimInput(event.target.firstname.value);
		var lastname 	  = trimInput(event.target.lastname.value);
		var email 		  = trimInput(event.target.email.value);
		var phone 		  = trimInput(event.target.phone.value);
		var mobile        = trimInput(event.target.mobile.value);
		var num_street    = trimInput(event.target.num_street.value);
		var social 		  = trimInput(event.target.social.value);

		var adminValidEmail = studentEmailExist(email);

		//geocomplete values
		var geocomplete = trimInput(event.target.geocomplete.value);
		var name 			  			= trimInput(event.target.name.value);
		var point_of_interest 			= trimInput(event.target.point_of_interest.value);
		var lat 			  			= trimInput(event.target.lat.value);
		var lng 			  			= trimInput(event.target.lng.value);
		var location 		  			= trimInput(event.target.location.value);
		var location_type 	  			= trimInput(event.target.location_type.value);
		var formatted_address 			= trimInput(event.target.formatted_address.value);
		var bounds 			  			= trimInput(event.target.bounds.value);
		var viewport 		  			= trimInput(event.target.viewport.value);
		var route 			  			= trimInput(event.target.route.value);
		var street_number 	  			= trimInput(event.target.street_number.value);
		var postal_code 	  			= trimInput(event.target.postal_code.value);
		var locality 	  	  			= trimInput(event.target.locality.value);
		var sublocality 				= trimInput(event.target.sublocality.value);
		var country 			  		= trimInput(event.target.country.value);
		var country_short 		  		= trimInput(event.target.country_short.value);
		var administrative_area_level_1 = trimInput(event.target.administrative_area_level_1.value);
		var place_id 	  				= trimInput(event.target.place_id.value);
		var id 	  						= trimInput(event.target.id.value);
		var reference 					= trimInput(event.target.reference.value);
		var url 	  					= trimInput(event.target.url.value);
		var website 	  				= trimInput(event.target.website.value);
		console.log(schoolIdRecent);

		if (adminValidEmail != 'not available') {
			if (isNotEmpty(schoolIdRecent) && isNotEmpty(relationship) && isNotEmpty(worksat) && isNotEmpty(firstname) && isNotEmpty(lastname)
			&& isNotEmpty(email) && isNotEmpty(mobile) && isNotEmpty(num_street)) {
				Meteor.call('AdminSchoolUpdate', schoolIdRecent, relationship, worksat, firstname, lastname, email, mobile, phone, num_street, social, geocomplete, country, 
					name, point_of_interest, lat, lng, location, location_type, formatted_address, bounds, viewport, route, street_number, 
					postal_code, locality, sublocality, country_short, administrative_area_level_1, place_id, id, reference, url, website, function (error, response) {
					if (error) {
						Bert.alert(error.reason, 'danger', 'growl-top-right');
						return false;
					} else {
						Meteor.call('AdminInviteMail', email, firstname, lastname, function (error, response) {
							if (error) {
								Bert.alert(error.reason, 'danger', 'growl-top-right');
								return false;
							} else {
								var schoolSlug = SchoolDb.findOne({_id: Session.get('recentSchoolId')});
								if (schoolSlug && schoolSlug.slug) {
									FlowRouter.redirect('/school/'+schoolSlug.slug);
									Bert.alert('School Admin updated successfully', 'success', 'growl-top-right');
								}
							}
						});
					}	
				});
			}
			return false;
		} else {
			Bert.alert('Email already used for a student record.', 'danger', 'growl-top-right');
			return false;
		}
	}
});