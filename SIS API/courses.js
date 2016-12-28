var request = require('request');
var fs = require('fs');
const SIS_API = process.env.SIS;

function getAllSchools() {
	request({
		url: 'https://sis.jhu.edu/api/classes/codes/schools',
		qs: {
			key: SIS_API
		}
	}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log(body);
		}
	}).pipe(fs.createWriteStream('schools.json'));
}

function getAllTerms() {
	request({
		url: 'https://sis.jhu.edu/api/classes/codes/terms',
		qs: {
			key: SIS_API
		}
	}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log(body);
		}
	});
}

function getDepartments(school) {
	request({
		url: 'https://sis.jhu.edu/api/classes/codes/departments/' + school,
		qs: {
			key: SIS_API
		}
	}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log(body);
		}
	});
}

function getTerm() {
	var today = new Date();
	var month = parseInt(today.getMonth());
	var year = parseInt(today.getFullYear());

	if (month >= 1 && month < 6) {
		return 'Spring ' + year;
	} else if (month > 6 && month <= 12) {
		return 'Fall ' + year;
	}
}

function getNextTerm() {
	var today = new Date();
	var month = parseInt(today.getMonth());
	var year = parseInt(today.getFullYear());

	if (month >= 2 && month < 6) {
		return 'Fall ' + year;
	} else if ((month >= 6 && month <= 12) || month < 2) {
		return 'Spring ' + (year + 1);
	}
}

function getCurrentDeptCourses(school, department, term) {
	request({
		url: 'https://sis.jhu.edu/api/classes/' + school + '/' + department + '/' + term + '/',
		qs: {
			key: SIS_API
		}
	}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var d = JSON.parse(body);
			for (var i = 0; i < d.length; i++) {
				console.log(d[i]);
			}
		}
	}).pipe(fs.createWriteStream('CS.json'));
}


// Testing the script
getCurrentDeptCourses('Whiting School of Engineering', 'EN Computer Science', getNextTerm());


