const https = require('https');

//allow self-signed cert, all comms in VPN network
process.env.NODE_NO_WARNINGS = 1;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function sendEvent(event) {
	var postData = JSON.stringify(event);

	var options = {
		hostname: '<host-ip>',
		port: 443,
		path: '/event',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length':postData.length
		}
	};

	var req = https.request(options, res => {
		console.log('statusCode:', res.statusCode);
		console.log('headers:', res.headers);

		res.setEncoding('utf8');
		res.on('data', chunk => {
			console.log(`BODY: ${ chunk}`);
		});
	});

	req.on('error', e => {
		console.error(e);
	});

	req.write(postData);
	req.end();

}

module.exports = event => {
	sendEvent({source: 'sandbox', ...event});
};


if(require.main === module){
    const {eventSimple, eventWithError} = require('./event-examples');
    // module.exports(eventSimple);
    module.exports(eventWithError);
}
