if (Meteor.isServer) {
    Meteor.methods({
        StudentMassMail: function () {
            var transporter = Nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'kehindeadeoya@gmail.com',
                pass: '321g201115@...Ademnew'
              }
            });

            var students = SchoolStudents.find({userId: this.userId});
           // var users = getAllUsersAsArray();

            // Loop through your users
            students.forEach(function (student){

                // Setup the message
                var mailOptions = {
                    from: "no-reply@christdoes.com",
                    to: student.useremail,
                    subject: 'Welcome. Kindly signup to join your school',
                    text: student.username
                }

                // Send mail
                transporter.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Message sent: " + response.message);
                    }
                });

            });
        },

         InviteMail: function (email, firstname, lastname) {
            check(email, String); check(firstname, String); check(lastname, String);
            var transporter = Nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'kehindeadeoya@gmail.com',
                pass: '321g201115@...Ademnew'
              }
            });
                var inviteadmin = SchoolDb.findOne({'admin.personal.email': email});
            // Setup the message
            if (inviteadmin && inviteadmin.addschoolname) {
                var mailOptions = {
                    from: "no-reply@christdoes.com",
                    to: email,
                    subject: 'Welcome. Kindly signup to join your school',
                    text: firstname +' ' +lastname +'  ' +'invited to as the admin for...' +inviteadmin.addschoolname
                }
                // Send mail
                transporter.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Message sent: " + response.message);
                    }
                });
            }
        }
    });
}