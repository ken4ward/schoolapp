Template.myprofile.onRendered(function(){
	$('#usersupdate').validate({
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
			num_street: {
				required: true,
				minlength: 10,
				maxlength: 100
			},
			geocomplete: {
				required: true
			},
			mypicture: {
				required: true
			}
		},
		messages: {
			mypicture: {
				required: 'Upload your picture'
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
            
			$("#mobile").intlTelInput({
			 	nationalMode: true,
	  		 	utilsScript: "/compatibility/6utils.js" // just for formatting/placeholders etc
			});

			var input = $('mobile'), output = $('output');
            input.on('keyup change', function () {
				var intlMobile = input.intlTelInput('getNumber');
				if (intlMobile) {
					output.val(intlMobile);
					console.log(output.text('International:  ' +intlMobile));
				} else {
					output.text('enter text below');
				}
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

Template.myprofile.events({
	'submit .usersupdate': function (event, template) {
		event.preventDefault();
		
		var firstname  = trimInput(event.target.firstname.value);
		var lastname   = trimInput(event.target.lastname.value);
		var intMobile  = trimInput(event.target.mobile.value);
		var num_street = trimInput(event.target.num_street.value);
		var facebook   = trimInput(event.target.facebook.value);

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

		var file = $('#file-upload').get(0).files[0];

		if (isNotEmpty(firstname) && isNotEmpty(lastname) && isNotEmpty(intMobile) && isNotEmpty(num_street)
			&& isNotEmpty(geocomplete) && isNotEmpty(country)) {
			Meteor.call('CreateUserRecord', firstname, lastname, intMobile, num_street, facebook, geocomplete, 
			name, point_of_interest, lat, lng, location, location_type, formatted_address, bounds, viewport, route,
			street_number, postal_code, locality, sublocality, country, country_short, administrative_area_level_1, place_id,
			id, reference, url, website, function (error, response) {
				if (error) {
					Bert.alert(error.reason, 'danger', 'growl-top-right');
					return false;
				} else {
					Bert.alert('Data updated successfully', 'success', 'growl-top-right');
				}
			});

			if (file) {
		      fsFile = new FS.File(file);

		      SchoolLogos.insert(fsFile, function (error, response) {
		        if (error) {
		          return false;
		          throw new Meteor.Error(error);
		        }else{
		          var userimage = '/cfs/files/SchoolLogos/'+response._id;

		          var userId = Meteor.userId();
		          Meteor.call('UserImagesUpload', userId, userimage, function (error, response) {
		            if (error) {
		              Bert.alert(error.reason, 'danger', 'growl-top-right');
		              return false;
		            }
		            else{
		              Bert.alert('Logo uploaded successfully', 'success', 'growl-top-right');
		              FlowRouter.redirect('/userview');
		            }
		          });
		        }
		      });

    } else {
    	Bert.alert('Please select your picture', 'danger', 'growl-top-right');
    }
		} 
		return false;
	}
});