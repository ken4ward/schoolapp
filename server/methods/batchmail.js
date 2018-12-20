if (Meteor.isServer) {
    Meteor.methods({
        BatchMassMail: function () {
            SSR.compileTemplate('htmlEmail', Assets.getText('student-email.html'));
            var students = SchoolStudents.find({userId: this.userId});
            students.forEach(function (student) {
                var emailData = {
                    firstname: student.firstname,
                    lastname: student.lastname,
                    appUrl: Meteor.absoluteUrl(),
                };

                Email.send({
                    to: student.useremail,
                    from: "no-reply@rabonni.com",
                    subject: "Student Verification Email",
                    html: SSR.render('htmlEmail', emailData),
                });
            });
        },

        AdminInviteMail: function (email, firstname, lastname) {
            check(email, String); check(firstname, String); check(lastname, String);
            SSR.compileTemplate('htmlEmail', Assets.getText('admin-email.html'));
            var inviteadmin = SchoolDb.findOne({'admin.personal.email': email});
            if (inviteadmin && inviteadmin.addschoolname) {
                var emailData = {
                    adminfirstname: firstname,
                    adminlastname: lastname,
                    appUrl: Meteor.absoluteUrl(),
                };

                Email.send({
                    to: email,
                    from: "no-reply@rabonni.com",
                    subject: "Admin Verification Email",
                    html: SSR.render('htmlEmail', emailData),
                });
            }
        }
    });
}