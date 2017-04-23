$(document).ready(function() {
	$('#number, #salesNumber').intlTelInput({
	        responsiveDropdown: true,
	        autoFormat: true,
	        utilsScript: '/vendor/intl-phone/libphonenumber/build/utils.js'
	    });
});