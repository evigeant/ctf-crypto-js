var hex = {
	name : 'Hex Decoder',
	decode : function(input) {
	    var str = '';
	    for (var i = 0; i < input.length; i += 2) str += String.fromCharCode(parseInt(input.substr(i, 2), 16));
	    return str;
	}	
};

register(hex);