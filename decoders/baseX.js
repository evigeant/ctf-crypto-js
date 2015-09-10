/* This file contains various decoders for Base8(Octal), Base16(Hex), Base64, Base94, Base95 */

/**
 * The base class for all these decoders
 * @constructor
 * @param {string} name The name of this decoder
 * @param {int} num_bin The number of binary bytes to process (ex: for Base64, this is 3)
 * @param {int} num_encoded The number of encoded bytes to produce for num_bin binary bytes (ex: for Base64 this is 4)
 * @param {string} alphabet The alphabet of encoded data
 * @param {array} decode_table The inverse table from the alphabet (this can be undefined, it will be computed automatically from the alphabet)
 * @returns {BaseX} The baseX decoder, the alphabet needs to be set
 */
function BaseX(name, num_bin, num_encoded, alphabet, decode_table) {
    this = Decoder(name);
    this.num_bin = num_bin;
    this.num_encoded = num_encoded;
    this.alphabet = alphabet;
    this.alphabet_bits = Math.log(alphabet.length, 2);
    
    if(!decode_table) {
	decode_table = [];
	for(var i = 0; i < alphabet.length; i++) {
	    decode_table[alphabet.charCodeAt(i)] = i;
	}
    }
    this.decode_table = decode_table;
    
    this.decode = function(input) {
	var bits = 0;
	var val = 0;
	var ret = '';
	for(var i = 0; i < input.length; i++) {
	    if(i % num_encoded === 0) {
		// Every num_encoded bytes, we reset our internal state since some decoders have fractional bits
		bits = 0;
		val = 0;
	    }
	    var c = input.charCodeAt(i);
	    var d = decode_table[c];
	    if(d) {
		val += d * alphabet.length;
		bits += alphabet_bits;
		
		if(bits >= 8) {
		    // We have a byte of output
		    var out = val % 256;
		    val = Math.floor(val / 256);
		}
	    } else {
		// Invalid character
		return new Decoded(this.name, 0.0, 'Invalid character ' + input[i] + ' at position ' + i + ' for decoder');
	    }
	}
	
	
	
	
	return new Decoded(this.name, 0.0, 'Implement the decode function to decode input');
    };    
}

var b64 = new Decoder('Base64');

b64.decode = function(input) {
    return new Decoded(this.name, 0.5, atob(input));
}

register(b64);