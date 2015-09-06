// All decoders must register
var decoders = [];

function register(decoderObject) {
	decoders.push(decoderObject);
}

//This is the main processing function
function process(val, output_div) {
	var out = '<table border="1"><tr><th>Name</th><th>Decoded</th></tr>';
	out += '<tr><td>Input</td><td>'+val+'</td></tr>';
	// Process the input in each decoder
	for (var i = 0; i < decoders.length; i ++) {
		try {
			var decoded = decoders[i].decode(val);
			out += '<tr><td>' + decoders[i].name + '</td><td>'+decoded+'</td></tr>';
		} catch(err) {
			out += '<tr><td>' + decoders[i].name + '</td><td>Error: '+err.message+'</td></tr>';
		}
	}
	out += '</table>';
	output_div.innerHTML = out;
}
