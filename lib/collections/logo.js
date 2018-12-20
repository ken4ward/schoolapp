SchoolLogos = new FS.Collection('SchoolLogos', {
	stores: [new FS.Store.FileSystem('SchoolLogos', {path: "~/uploads"})]
});

SchoolLogos.allow({

	insert: function (schoolId, doc) {
		return true;
	},
	update: function (schoolId, doc, fields, modifier) {
		return true;
	},
	download: function () {
		return true;
	}
});

SchoolLoogDBURLs = new Mongo.Collection("SchoolLoogDBURLs");

SchoolLoogDBURLs.allow({
	insert: function () {
		return true;
	},
	update: function (schoolId, doc, fields, modifier) {
		return true;
	}
});