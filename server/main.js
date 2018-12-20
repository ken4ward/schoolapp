import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
	Accounts.emailTemplates.siteName = "ChristDoes";
	Accounts.emailTemplates.from     = "ChristDoes <no-reply@christdoes.com>";

  Meteor.startup(function(){
    process.env.MAIL_URL="smtp://kehindeadeoya%40gmail.com:321g201115@...Ademnew@smtp.gmail.com:587/";

    Accounts.emailTemplates.resetPassword.text = function(user, url){
        var token = url.substring(url.lastIndexOf('/')+1, url.length);
        var newUrl = Meteor.absoluteUrl('reset-password/'+token);
        var str = 'Hello,\n';
            str+= 'To reset your password, please click follow link...\n';
            str+= newUrl;
        return str;
    }
  });

	Accounts.emailTemplates.verifyEmail = {
	  subject() {
	    return "[ChristDoes] Verify Your Email Address";
	  },
	  text( user, url ) {
	    let emailAddress   = user.emails[0].address,
	        urlWithoutHash = url.replace( '#/', '' ),
	        supportEmail   = "support@christdoes.com",
	        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

	    return emailBody;
	  }
	};

	
}
