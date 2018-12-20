Template.schooladdress.onRendered(function(){
	$('.addschooladdress').validate({
		rules: {
			selectschool: {
				required: true
			},
			unit: {
				required: true
			},
			branches: {
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
			schoolwebiste: {
				minlength: 10,
				maxlength: 100
			}
		},
		messages:{
			selectschool: {
				required: 'Select an option'
			},
			unit: {
				required: 'Select an option'
			},
			branches: {
				required: 'Select an option'
			}
		}
	});

	Meteor.setTimeout(function () {

		$(function () {

			/*var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyA55ihs_QPBpO5rSV4DoV1TJ0FX4ofL8zk&libraries=places";
            document.body.appendChild(script);
            console.log(script);*/
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

Template.schooladdress.events({
	'submit .addschooladdress': function (event, template) {
		event.preventDefault();

		var selectschoolId  = trimInput(event.target.selectschool.value);
		var unit = $("#unit :selected").text();
		var branches = $("#branches :selected").text();
		var email 		  = trimInput(event.target.email.value);
		var phone 		  = trimInput(event.target.phone.value);
		var mobile 		  = trimInput(event.target.mobile.value);
		var num_street 	  = trimInput(event.target.num_street.value);
		var schoolwebiste = trimInput(event.target.schoolwebiste.value);

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

		if (isNotEmpty(selectschoolId) && isNotEmpty(unit) && isNotEmpty(branches) && isNotEmpty(email) && isNotEmpty(mobile)
			&& isNotEmpty(num_street) && isNotEmpty(geocomplete) && isNotEmpty(country)) {
			Meteor.call('SchoolAddress', selectschoolId, unit, branches, email, phone, mobile, num_street, schoolwebiste, geocomplete, 
			name, point_of_interest, lat, lng, location, location_type, formatted_address, bounds, viewport, route,
			street_number, postal_code, locality, sublocality, country, country_short, administrative_area_level_1, place_id,
			id, reference, url, website, function (error, response) {
				if (error) {
					Bert.alert(error.reason, 'danger', 'growl-top-right');
					return false;
				} else {
					Bert.alert('School address updated successfully', 'success', 'growl-top-right');
					FlowRouter.redirect('/logo/school');
				}
			});
		} 
		return false;
	}
});

Template.schooladdress.helpers({
	OnlyUsersSchool: function () {
		var subValues = Meteor.subscribe('allUserSchools');
		if (Meteor.userId() && subValues.ready()) {
			if (Meteor.user().emails[0].verified) {
				return SchoolDb.find({userId: Meteor.userId()}).fetch().reverse();
			} else {
				Bert.alert('Please verify your account to proceed', 'success', 'growl-top-right');
			}
		}
	}
});
