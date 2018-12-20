if (Meteor.isServer) {
	
    Meteor.methods({
        MassMail: function () {
        	var transporter = Nodemailer.createTransport({
        	  jsonTransport: true,
              service: 'Gmail',
              auth: {
                user: 'kehindeadeoya@gmail.com',
                pass: '321g201115@...Ademnew'
              }
            });

        	const Email = require('email-templates');

			const email = new Email({
			  message: {
			    from: 'niftylettuce@gmail.com'
			  },
			   send: true
			  
			});

			email.send({
			  template: 'mars',
			  message: {
			    to: 'ken4ward@yahoo.com'
			  },
			  locals: {
			    name: 'Elon'
			  }
			}).then(console.log).catch(console.error);
		}
    });
}