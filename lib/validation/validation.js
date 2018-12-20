// Trim Helper
trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
};

isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
	return false;
};

// Validate Email
isEmail = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(value)) {
		return true;
	}
	Bert.alert("Please use a valid email address", "danger", "growl-top-right");
	return false;
};

// Check Password Field
isValidPassword = function(password){
	if(password.length <6) {
		Bert.alert("Password must be at least 6 characters", "danger", "growl-top-right");
		return false;
	}
	return true;
};

// Match Password
areValidPasswords = function(password, confirm) {
	if(!isValidPassword(password)) {
		return false;
	}
	if(password !== confirm) {
		Bert.alert("Passwords do not match", "danger", "growl-top-right");
		return false;
	}
	return true;
};

areValidEmails = function(studentemail, inputemail) {
	if(!isEmail(studentemail) && !isEmail(inputemail)) {
		return false;
	}
	if(studentemail !== inputemail) {
		Bert.alert("Email do not match any student record", "danger", "growl-top-right");
		return false;
	}
	return true;
};

isUsername = function(username) {
	var filter = /^[a-zA-Z0-9]+$/;
	if(filter.test(username)) {
		return true;
	}
	Bert.alert("Only alphabets and numbers are acceptable as a valid username", "danger", "growl-top-right");
	return false;
};

usernameLength = function(username){
	if(username.length < 5) {
		Bert.alert("Username must be at least 5 characters", "danger", "growl-top-right");
		return false;
	}
	return true;
};

alphanumeric = function (event, filedname) {
	var unicode = event.charCode? event.charCode : event.keyCode;
	if (unicode != 8) {
		if (unicode < 48 || unicode > 90) {
			return false;
		}
	}
}

isSchoolField = function(schoolfield){
	if(schoolfield.length < 50 && schoolfield.length > 100) {
		Bert.alert( schoolfield +"  can not be more than 100 characters", "danger", "growl-top-right");
		return false;
	}
	return true;
};

isSchoolTextarea = function(schooltextarea){
	if(schooltextarea.length < 250 && schooltextarea > 400) {
		Bert.alert( schooltextarea +"  can not be more than 400 characters", "danger", "growl-top-right");
		return false;
	}
	return true;
};

arrayIsEmpty = function (argument) {
	if (typeof argument === 'object' && argument instanceof Array) {
		if (!argument.length && argument === null) {
			Bert.alert('Please select at least a course to continue', 'danger', 'growl-top-right');
			console.log('empty');
			return false;
		}else {
			console.log('real');
			return argument;
		}
	}else {
		console.log(argument);
		return argument;
	}
	return false;
};


