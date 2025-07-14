const http = require('https');

const options = {
	method: 'GET',
	hostname: 'google-flights2.p.rapidapi.com',
	port: null,
	path: '/api/v1/getCalendarPicker?departure_id=LAX&arrival_id=JFK&travel_class=ECONOMY&trip_type=ONE_WAY&adults=1&currency=USD&country_code=US',
	headers: {
		'x-rapidapi-key': '2537c1dd4dmsh6a1d4e6320035cfp17980djsn32d6f2895e18',
		'x-rapidapi-host': 'google-flights2.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();