UserImages = new FS.Collection('userimages', {
	stores: [new FS.Store.FileSystem('UserImages', {path: "~/uploads"})]
});

UserImages.allow({

	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return true;
	},
	download: function () {
		return true;
	}
});

UserImagesURL = new Mongo.Collection("userimagesurl");

UserImagesURL.allow({
	insert: function () {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return true;
	}
});