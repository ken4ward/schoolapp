if (Meteor.isServer) {
	Meteor.methods({
		StudentUpload: function (data) {
	    check( data, Array );

		    for ( var i = 0; i < data.length; i++ ) {
		      var item   = data[ i ],
		          exists = SchoolStudents.findOne( { useremail: item.useremail } );
		         // existUser = SchoolStudents.findOne( { email: item.useremail } );

		      if ( !exists ) {
		        SchoolStudents.insert({ 
		        	firstname: item.firstname,
		        	lastname: item.lastname,
		        	middlename: item.middlename,
		        	username: item.username,
		        	password: Random.id(8),
		        	useremail: item.useremail,
		        	studentclass: item.studentclass,
		        	dateofbirth: item.dateofbirth,
		        	gender: item.gender,
		        	ethinicity: item.ethinicity,
		        	mobile: item.mobile,
		        	address: item.address,
		        	city: item.city,
		        	lg: item.LG,
		        	state: item.state,
		        	country: item.country,
		        	registra: item.registra,
		        	status: {
		        		active: 0,
		        		activedate: new Date()
		        	},
		        	registereddate: new Date(),
		        	userId: Meteor.userId(),
		        	createdAt: new Date()
		        });
		      } else {
		        console.warn( 'Rejected. This item already exists.' );
		      }
		    }
		  },

		  DeleteSingleStudent: function (studentId) {
		  	check(studentId, String);
		  	var deleteStudent = SchoolStudents.findOne({_id: studentId});
		  	if (deleteStudent && deleteStudent.userId) {
		  		if (deleteStudent.userId === Meteor.userId()) {
		  			SchoolStudents.remove(deleteStudent._id);
		  			StudentSchool.remove(deleteStudent._id);
		  		} else {
		  			throw new Meteor.Error('You are not allowed to delete this');
		  		}
		  	}
		  },
		  StudentBatchDelete: function (mySelectedStudents) {
		  	check(mySelectedStudents, Array);
		  	if (Meteor.userId()) {
		  		mySelectedStudents.forEach(function (studentIds) {
		  			SchoolStudents.remove(studentIds.replace(/[""{}\s]/g, ''));
		  			StudentSchool.remove(studentIds.replace(/[""{}\s]/g, ''));
		  		});
		  	}
		  }
		});
}