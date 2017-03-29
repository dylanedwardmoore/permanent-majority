$(document).ready(function() {
	$('#number, #salesNumber').intlTelInput({
	        responsiveDropdown: true,
	        autoFormat: true,
	        utilsScript: '/vendor/intl-phone/libphonenumber/build/utils.js'
	    });
	$('#init_call_twilio').click(function() {
	  // twilio.calls.create({
	  //   url: "http://demo.twilio.com/docs/voice.xml", //TODO: get a valid url here.
	  //   to: req.body.number,
	  //   from: process.env.TWILIO_PHONE_NUMBER,
	  //   record: true,
	  //   RecordingStatusCallback: '/storeTwilioPhoneCall'
	  // }, function(err, call) {
	  //   if(err) { return next(err.message); }
	  //   process.stdout.write(call.sid);
	  //   res.redirect('/api/twilio');
	  // });
	});
});