var exposed = FlowRouter.group();

function checkLoggedIn (ctx, redirect) {  
  if (!Meteor.userId()) {
    redirect('/');
  }
}

function redirectIfLoggedIn (ctx, redirect) {  
  if (Meteor.userId()) {
    redirect('/dashboard');
  }
}

exposed.route('/', {
  name: 'home', action(){
    BlazeLayout.render('MainLayout', {main: 'HomeLayout'});
  }
});

FlowRouter.route('/loading', {
  name: 'loading', action(){
    BlazeLayout.render('loading');
  }
})

exposed.route('/signup', {
  name: 'signup', action(){
    BlazeLayout.render('MainLayout', {main: 'SignupLayout'});
  }
});

FlowRouter.route('/dashboard', {
  name: 'dashboard', action(){
    BlazeLayout.render('backrender', {back: 'dashboard'});
  }
});

exposed.route('/terms', {
  name: 'terms', action(){
    BlazeLayout.render('MainLayout', {back: 'terms'});
  }
});

FlowRouter.notFound = {
  action: function () {
    BlazeLayout.render('notFound');
  }
}

FlowRouter.route('/sent-verify-email', {
  name: 'sent-verify-email', action(){
    BlazeLayout.render('MainLayout', {main: 'VerifyEmailLayout'});
  }
});

FlowRouter.route('/search-global', {
  name: 'search-global', action(){
    BlazeLayout.render('MainLayout', {main: 'globalsearch'});
  }
});

FlowRouter.route('/students', {
  name: 'students', action(){
    BlazeLayout.render('formrender', {formrend: 'student'});
  }
});

FlowRouter.route('/student/dashboard', {
  name: 'students-dashboard', triggersEnter: [checkLoggedIn], action(){
    BlazeLayout.render('studentlayout', {studentrender: 'studentdashboard'});
  }
});

FlowRouter.route('/student/profile', {
  name: 'students-profile', triggersEnter: [checkLoggedIn], action(){
    BlazeLayout.render('studentlayout', {studentrender: 'studentprofile'});
  }
});

FlowRouter.route('/student/academic', {
  name: 'students-academic', triggersEnter: [checkLoggedIn], action(){
    BlazeLayout.render('studentlayout', {studentrender: 'studentview'});
  }
});

FlowRouter.route('/courses', {
  name: 'courses', triggersEnter: [checkLoggedIn], action(){
    BlazeLayout.render('formrender', {formrend: 'courses'});
  }
});

FlowRouter.route('/modules', {
  name: 'modules', triggersEnter: [checkLoggedIn], action(){
    BlazeLayout.render('formrender', {formrend: 'modules'});
  }
});

FlowRouter.route('/myprofile', {
  name: 'myprofile', triggersEnter: [checkLoggedIn], action(){
    BlazeLayout.render('formrender', {formrend: 'myprofile'});
  }
});

FlowRouter.route('/userview', {
  name: 'userview', triggersEnter: [checkLoggedIn], action(){
    BlazeLayout.render('formrender', {formrend: 'userview'});
  }
});

FlowRouter.route('/school/basic', {
  name: 'basic-info', triggersEnter: [checkLoggedIn], action(){
    BlazeLayout.render('formrender', {formrend: 'basic'});
  }
});

FlowRouter.route('/school/basic/edit', {
  name: 'basic-edit', action(){
    BlazeLayout.render('formrender', {formrend: 'editbasic'});
  }
});

FlowRouter.route('/school/myviews', {
  name: 'myviews', action(){
    BlazeLayout.render('formrender', {formrend: 'myviews'});
  }
});
exposed.route('/search', {
  name: 'search', action(){
    BlazeLayout.render('formrender', {formrend: 'globalsearch'});
  }
});

FlowRouter.route('/school/:myslug', {
  name: 'view', action: function () {
    BlazeLayout.render('sidebarschool', {sidebars: 'view'});
  }
});

FlowRouter.route('/admin/school', {
  name: 'view', action: function () {
    BlazeLayout.render('sidebarschool', {sidebars: 'schooladmin'});
  }
});

FlowRouter.route('/viewadmin/school', {
  name: 'view', action: function () {
    BlazeLayout.render('sidebarschool', {sidebars: 'viewadmin'});
  }
});

FlowRouter.route('/modules/:moduleslug', {
  name: 'view', action: function () {
    BlazeLayout.render('sidebarschool', {sidebars: 'moduleview'});
  }
});

FlowRouter.route('/student/:studentslug', {
  name: 'view', action: function () {
    BlazeLayout.render('sidebarschool', {sidebars: 'studentsview'});
  }
});

FlowRouter.route('/address/school', {
  name: 'school-address', action(){
    BlazeLayout.render('sidebarschool', {sidebars: 'schooladdress'});
  }
});

FlowRouter.route('/logo/school', {
  name: 'school-logo', action(){
    BlazeLayout.render('sidebarschool', {sidebars: 'logo'});
  }
});

/*FlowRouter.route('/school/:slug', {
  name: 'school-view', action(){
    BlazeLayout.render('sidebarschool', {sidebars: 'schoolview'});
    Session.set('schoolslug',params.slug);
  }
});*/

FlowRouter.route('/login', {
  name: 'login', action(){
    BlazeLayout.render('MainLayout', {main: 'LoginLayout'});
  }
});

FlowRouter.route('/reset-password/:token', {
  name: 'resetpassword', action() {
    BlazeLayout.render('MainLayout', {main: 'ResetMyPassword'});
  }
});

FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go( '/dashboard' );
        Bert.alert( 'Email verified! Thanks!', 'success' );
      }
    });
  }
});

/*FlowRouter.route('/dashboard', {
  name: 'dashboard', action(){
    BlazeLayout.render('BackendLayout', {backend: 'dashboard'});
  }
});*/

FlowRouter.route('/addschool', {
  name: 'addschool', action(){
    BlazeLayout.render('BackendLayout', {backend: 'AddSchoolLayout'});
  }
});

//The router pointer is actually pointing to school contact template
FlowRouter.route('/geocomplete', {
  name: 'geocomplete', action(){
    BlazeLayout.render('BackendLayout', {backend: 'SchoolContactLayout'});
  }
});

FlowRouter.route('/logo-upload', {
  name: 'logo-upload', action(){
    BlazeLayout.render('BackendLayout', {backend: 'LogoLayout'});
  }
});

//The router pointer is actually pointing to geocomplete template
FlowRouter.route('/schoolcontact', {
  name: 'schoolcontact', action(){
    BlazeLayout.render('BackendLayout', {backend: 'geolayout'});
  }
});

FlowRouter.route('/school/dashboard', {
  name: 'schooldashboard', action(){
    BlazeLayout.render('RenderBoardLayout', {renderboard: 'SchoolDashboardLayout'});
  }
});

FlowRouter.route('/search', {
  name: 'search', action(){
    BlazeLayout.render('MainLayout', {main: 'SearchLayout'});
  }
});

FlowRouter.route('/outdashboard', {
  name: 'outdashboard', action(){
    BlazeLayout.render('MainLayout', {main: 'OutDashboardLayout'});
  }
});

FlowRouter.route('/school/admin', {
  name: 'FlowRouter', action(){
    BlazeLayout.render('BackendLayout', {backend: 'AddAdminLayout'});
  }
});

FlowRouter.route('/school/poster', {
  name: 'schoolposter', action(){
    BlazeLayout.render('BackendLayout', {backend: 'PosterLayout'});
  }
});

//Routes for online classes
FlowRouter.route('/course/home', {
	name: 'coursehome', action(){
		BlazeLayout.render('appLayout', {course: 'home'});
	}
});

FlowRouter.route('/course/teach', {
  name: 'teach', action(){
    BlazeLayout.render('appLayout', {course: 'teach'});
  }
});

FlowRouter.route('/course/learn', {
  name: 'learn', action(){
    BlazeLayout.render('appLayout', {course: 'learn'});
  }
});

FlowRouter.route('/course/:courseId', {
  name: 'course', action(){
    BlazeLayout.render('appLayout', {course: 'course'});
  }
});


