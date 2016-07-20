const erf = require("math-erf");
const exp = require("math-exp");


function numerize(arg) {
    return (typeof arg == 'string') ? parseFloat(arg) : arg;
}

module.exports = {

    kronecker_delta: function(i, j) {
        i = numerize(i);
        j = numerize(j);
        if (isNaN(i) || isNaN(j)) {
            return NaN;
        }
        var MAX_SAFE_INTEGER = 9007199254740991;
        if ( i < 0 || i !== Math.round(i) || i > MAX_SAFE_INTEGER || j < 0 || j !== Math.round(j) || j > MAX_SAFE_INTEGER) {
            throw new RangeError("Expected two non-negative integer arguments.");
        }
        
        return (i === j) ? 1 : 0;
    },

    dirac_delta: function delta(x) {
        x = numerize(x);
        if (isNaN(x)) {
            return NaN;
        }
        return x === 0 ? Number.POSITIVE_INFINITY : 0;
    },

    dirac_delta_integral: function(lowerBound, upperBound) {
        if (typeof lowerBound == 'undefined') {
            lowerBound = Number.NEGATIVE_INFINITY;
        }
        if (typeof upperBound == 'undefined') {
            upperBound = Number.POSITIVE_INFINITY;
        }
        lowerBound = numerize(lowerBound);
        upperBound = numerize(upperBound);
        if (isNaN(lowerBound) || isNaN(upperBound)) {
            return NaN;
        }
        if (lowerBound > upperBound) {
            return -this.dirac_delta_integral(upperBound, lowerBound);
        }
        return lowerBound > 0 || upperBound < 0 ? 0 : 1;
    },

    nascent_delta: function(a, x) {
        a = numerize(a);
        x = numerize(x);
        if (isNaN(a) || isNaN(x)) {
            return NaN;
        }
        if (a === 0) {
            return this.dirac_delta(x);
        }
        return exp(-(x*x)/(a*a)) / (a * Math.sqrt(Math.PI));
    },

    nascent_delta_integral: function(a, lowerBound, upperBound) {
        if (typeof lowerBound == 'undefined') {
            lowerBound = Number.NEGATIVE_INFINITY;
        }
        if (typeof upperBound == 'undefined') {
            upperBound = Number.POSITIVE_INFINITY;
        }
        a = numerize(a);
        lowerBound = numerize(lowerBound);
        upperBound = numerize(upperBound);
        if (a === 0) {
            return this.dirac_delta_integral(lowerBound, upperBound);
        }
        return (erf(upperBound/a) - erf(lowerBound / a)) / 2;
    }

};