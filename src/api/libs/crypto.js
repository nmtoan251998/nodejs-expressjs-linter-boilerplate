const crypto = require('crypto');

class CryptoJs {
    constructor() {
        this.lengthOfRandomBytes = 16;
    }

    /**
     * Generate random string of characters
     * @param {Number} length Length of random string
     */
    generateRandomString(length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, length); // return number of required characters
    }

    /**
     * Hash string with sha512
     * @param {String} string String need to be hashed
     * @param {String} salt Data to be validated
     */
    sha512(string, salt) {
        const hash = crypto.createHmac('sha512', salt); // hashing algo sha512

        hash.update(string);

        const hashedValue = hash.digest('hex');

        return hashedValue;
    }

    hash(string) {
        const salt = this.generateRandomString(this.lengthOfRandomBytes);
        const hashedString = this.sha512(string, salt);

        return hashedString;
    }
}

module.exports = CryptoJs;
