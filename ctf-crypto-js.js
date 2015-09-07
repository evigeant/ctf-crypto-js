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
 * Formats the decoded value to be displayed in HTML
 * 
 * @param {Decoded}
 *                decoded The decoded value
 * @returns {string} The HTML string to insert in the output_div
 */
function formatDecoded(decoded) {
    var out = '';
    if (decoded.err) {
	out += '<tr class="error">';
    } else {
	out += '<tr>';
    }
    out += '<td>' + decoded.name + '</td><td>' + decoded.probability + '</td><td>' + decoded.value + '</td></tr>';
    return out;
}


/**
 * A function that compares two Decoded object based on their probability
 * @param {Decoded} first
 * @param {Decoded} second
 * @returns -1 if the first is more probable than second, 0 if both are equal, 1 if second is more probable than first
 */
function decodedProbCompare(first, second) {
    return second.probability - first.probability;
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
    var decoded_list = [];
    // Process the input in each decoder
    for ( var i = 0; i < decoders.length; i++) {
	try {
	    decoded_list.push(decoders[i].decode(val));
	} catch (err) {
	    var decoded_err = new Decoded(decoders[i].name, 0.0, err.message);
	    decoded_err.err = true;
	    decoded_list.push(decoded_err);
	}
    }
    
    decoded_list.sort(decodedProbCompare);

    var out = '<table border="1"><tr><th>Name</th><th>Prob</th><th>Decoded</th></tr>';
    out += '<tr><td>Input</td><td></td><td>' + val + '</td></tr>';
    
    for ( var i = 0; i < decoded_list.length; i++) {
	out += formatDecoded(decoded_list[i])
    }
    
    out += '</table>';
    output_div.innerHTML = out;
}
