var b64 = new Decoder('Base64');

b64.decode = function(input) {
    return new Decoded(this.name, 0.5, atob(input));
}

register(b64);