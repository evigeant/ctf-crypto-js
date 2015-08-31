// All decoders must register
var decoders = [];

function register(decoderObject) {
	decoders.push(decoderObject);
}

//This is the main processing function
function process(val, output_div) {
	output_div.innerHTML = val;
	// Process the input in each decoder
	for (var i = 0; i < decoders.length; i ++) {
		var decoded = decoders[i].decode(val);
		output_div.innerHTML += '<br>';
		output_div.innerHTML += decoded;
	}
	
}
