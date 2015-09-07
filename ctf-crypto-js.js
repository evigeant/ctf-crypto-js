// All decoders must register
var decoders = [];

/**
 * Creates a new instance of a decoder, you should customize the decode function
 * to decode the input properly.
 * 
 * @constructor
 * @param {string}
 *                name The name of this decoder
 * @returns new Decoder object
 */
function Decoder(name) {
    this.name = name;
    this.decode = function(input) {
	return new Decoded(this.name, 0.0, 'Implement the decode function to decode input');
    };
}

/**
 * Creates an instance of the decoder output
 * 
 * @constructor
 * @param {string}
 *                name The name of the decoder which produced this data
 * @param {number}
 *                probability A number between 0 and 1 indicating the
 *                probability that the value was decoded correctly
 * @param {string
 *                or object} value The decoded value
 * @returns new Decoded object
 */
function Decoded(name, probability, value) {
    this.name = name;
    this.probability = probability;
    this.value = value;
}

/**
 * Adds a new decoder implementation to the list of registered decoders. Typical
 * code will look like: <code>
 * var example = new Decoder(...)
 * // Customize the decoder
 * register(example)
 * </code>
 * 
 * @param {Decoder}
 *                decoder The decoder to register
 */
function register(decoder) {
    decoders.push(decoder);
}

/**
 * This is the main decoding function, it is called from the HTML and can also
 * be called recursively
 * 
 * @param {string}
 *                val The value to decode
 * @param {div}
 *                output_div The div in which the output will be rendered
 */
function process(val, output_div) {
    var out = '<table border="1"><tr><th>Name</th><th>Decoded</th></tr>';
    out += '<tr><td>Input</td><td>' + val + '</td></tr>';
    // Process the input in each decoder
    for ( var i = 0; i < decoders.length; i++) {
	try {
	    var decoded = decoders[i].decode(val);
	    out += '<tr><td>' + decoded.name + ' ' + decoded.probability + '</td><td>' + decoded.value + '</td></tr>';
	} catch (err) {
	    out += '<tr><td>' + decoders[i].name + '</td><td>Error: ' + err.message + '</td></tr>';
	}
    }
    out += '</table>';
    output_div.innerHTML = out;
}
