var b64 = {
	name : 'Base 64 decoder',
	decode : function(input) {
		return atob(input);
	}
	
};

register(b64);