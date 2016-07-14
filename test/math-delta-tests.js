var delta = require('../math-delta.js');

var assert = require('assert');

var chai = require('chai');
var should = chai.should();

var epsilon = 0.001; // floating point tolerance

describe('#kronecker_delta', function() {
    it ('Returns NaN when appropriate', function() {

        // TDD styles
        assert(isNaN(delta.kronecker_delta()));
        assert(isNaN(delta.kronecker_delta(0, NaN)));
        assert(isNaN(delta.kronecker_delta(2, "Corinthians")));

        assert(!isNaN(delta.kronecker_delta("1", 1)));
        assert(!isNaN(delta.kronecker_delta("2", "3")));

        chai.assert.isNaN(delta.kronecker_delta());
        chai.assert.isNaN(delta.kronecker_delta(0, NaN));
        chai.assert.isNaN(delta.kronecker_delta("epic", "fail"));

        chai.assert.isNotNaN(delta.kronecker_delta("1", 1));
        chai.assert.isNotNaN("2", "3");

        // BDD styles
        chai.expect(delta.kronecker_delta()).to.be.NaN;
        chai.expect(delta.kronecker_delta(0, NaN)).to.be.NaN;
        chai.expect(delta.kronecker_delta("epic", "fail")).to.be.NaN;

        (delta.kronecker_delta()).should.be.NaN;
        (delta.kronecker_delta(0, NaN)).should.be.NaN;
        (delta.kronecker_delta("epic", "fail")).should.be.NaN;

    });
    it ("Throws RangeError with negative or fractional arguments", function() {

        // TDD styles
        assert.throws(function() {
            delta.kronecker_delta(-1, 1);
        }, RangeError);

        assert.throws(function() {
            delta.kronecker_delta(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY);
        }, RangeError);

        chai.assert.throws(function() {
            delta.kronecker_delta(-1, 1);
        }, RangeError);

        chai.assert.throws(function() {
            delta.kronecker_delta(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY);
        }, RangeError);

        // BDD styles
        chai.expect(function() {
            delta.kronecker_delta(0, 1.5);
        }).to.throw.RangeError;

        chai.expect(function() {
            delta.kronecker_delta(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY);
        }).to.throw.RangeError;

        (function(){
            delta.kronecker_delta(0.5, 1.5)
        }).should.throw(RangeError);

        (function(){
            delta.kronecker_delta((Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY))
        }).should.throw(RangeError);

        (function(){delta.kronecker_delta(1, 1)
        }).should.not.throw(RangeError);

        (function(){delta.kronecker_delta(9007199254740991, 9007199254740991)
        }).should.not.throw(RangeError);

    });
    it ('Returns 0 when i does not equal j', function() {

        assert.equal(delta.kronecker_delta(0, 2), 0);

        chai.assert.equal(delta.kronecker_delta(0, 2), 0);

        chai.expect(delta.kronecker_delta(0, 2)).to.equal(0);

        delta.kronecker_delta(0, 2).should.equal(0);

    });
    it ('Returns 1 when i equals j', function() {

        assert.equal(delta.kronecker_delta(0, 0), 1);

        chai.assert.equal(delta.kronecker_delta(0, 0), 1);

        chai.expect(delta.kronecker_delta(0, 0)).to.equal(1);

        delta.kronecker_delta(0, 0).should.equal(1);

    });
});

describe('#dirac_delta', function() {
    it ('Returns NaN when not given a numeric argument', function() {

        assert(isNaN(delta.dirac_delta("mattress")));

        chai.assert.isNaN(delta.dirac_delta("mattress"));

        chai.expect(delta.dirac_delta("mattress")).to.be.NaN;

        delta.dirac_delta("mattress").should.be.NaN;

    });
    it ('Returns NaN when argument is NaN', function() {

        chai.expect(delta.dirac_delta(NaN)).to.be.NaN;

        (delta.dirac_delta(NaN)).should.be.NaN;

    });
    it('Returns POSITIVE_INFINITY when given an argument of zero', function() {

        assert.equal(delta.dirac_delta(0), Number.POSITIVE_INFINITY);

        chai.assert.equal(delta.dirac_delta(0), Number.POSITIVE_INFINITY);

        chai.expect(delta.dirac_delta(0)).to.equal(Number.POSITIVE_INFINITY);

        delta.dirac_delta(0).should.equal(Number.POSITIVE_INFINITY);

    });
    it('Returns zero when given a nonzero argument', function() {

        assert.equal(delta.dirac_delta(3), 0);

        chai.assert.equal(delta.dirac_delta(3), 0);

        chai.expect(delta.dirac_delta(3)).to.equal(0);
        chai.expect(delta.dirac_delta("2", "Corinthians")).to.equal(0);
        chai.expect(delta.dirac_delta(Number.NEGATIVE_INFINITY)).to.equal(0);

        delta.dirac_delta(Number.POSITIVE_INFINITY).should.equal(0);

    });
});

describe ('#dirac_delta_intgral', function() {
    it('Returns NaN when not given a numeric argument', function(){
        chai.expect(delta.dirac_delta_integral('Donald', "Trump")).to.be.NaN;
        chai.expect(delta.dirac_delta_integral(2, "Corinthians")).to.be.NaN;
    });
    it ('Handles indefinite integrals', function() {
        chai.expect(delta.dirac_delta_integral()).to.equal(1);
        chai.expect(delta.dirac_delta_integral(-6)).to.equal(1);
        chai.expect(delta.dirac_delta_integral(6)).to.equal(0);
        chai.expect(delta.dirac_delta_integral(undefined, -4)).to.equal(0);
        chai.expect(delta.dirac_delta_integral(undefined, 4)).to.equal(1);
    });
    it ('Returns 0 when x=0 is not within the interval', function() {
        chai.expect(delta.dirac_delta_integral(-2, -4)).to.equal(0);
        chai.expect(delta.dirac_delta_integral(2, 4)).to.equal(0);
        chai.expect(delta.dirac_delta_integral(Number.POSITIVE_INFINITY)).to.equal(0);
    });
    it('Returns 1 when x=0 lies within interval', function() {
        chai.expect(delta.dirac_delta_integral(-7, 7)).to.equal(1);
        chai.expect(delta.dirac_delta_integral(0, 4)).to.equal(1);
        chai.expect(delta.dirac_delta_integral(0, 0)).to.equal(1);
    });
    it("Returns -1 when x=0 lies within a reversed interval", function() {
        chai.expect(delta.dirac_delta_integral(7, -7)).to.equal(-1);
        chai.expect(delta.dirac_delta_integral(4, 0)).to.equal(-1);
        chai.expect(delta.dirac_delta_integral(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)).to.equal(-1);
    });
});

describe ('#nascent_delta', function() {
    it('Returns NaN when not given a numeric argument', function(){
        chai.expect(delta.dirac_delta_integral('Donald', 'Trump')).to.be.NaN;
    });
    it('Returns dirac_delta(x) when a == 0', function() {
        for (var x = -5; x <= 5; x++) {
            chai.expect(delta.nascent_delta(0, x)).to.equal(delta.dirac_delta(x));
        }
    });
    it('Returns value of 1/(a * sqrt(pi)) when a > 0 and x == 0', function() {
        chai.expect(delta.nascent_delta(1, 0)).to.be.closeTo(0.5642, epsilon);
        chai.expect(delta.nascent_delta(1/3, 0)).to.be.closeTo(1.692, epsilon);
        chai.expect(delta.nascent_delta(1/10, 0)).to.to.be.closeTo(5.642, epsilon);
    });
    it('Behaves as an even function', function() {
        var vals = [0, 1, 2, 3, Number.POSITIVE_INFINITY];
        for (var i in vals) {
            var x = vals[i];
            chai.expect(delta.nascent_delta(1, x)).to.equal(delta.nascent_delta(1, -x));
        }
    });
    it('Descends monotonically with respect to |x|', function() {
        for (var inv_a = 1; inv_a <= 5; inv_a++) {
            var a = 1 / inv_a;
            var vals = [0, 1, -2, 3, -4, 5, Number.NEGATIVE_INFINITY];
            var lastX = NaN;
            for (var i in vals) {
                var x = vals[i];
                if (!isNaN(lastX)) {
                    chai.expect(delta.nascent_delta(a, Math.abs(x))).to.be.lessThan(delta.nascent_delta(a, Math.abs(lastX)));
                }
                lastX = x;
            }
        }
    });
    it ('Returns tiny values when |x| is large', function() {
        chai.expect(delta.nascent_delta(1, 10)).to.be.closeTo(0, epsilon);
        chai.expect(delta.nascent_delta(1, -10)).to.be.closeTo(0, epsilon);
    });
});

describe ('#nascent_delta_integral', function(){
    it ('Returns a value close to 1.0 when a > 0, lowerBound << 0, and upperBound >> 0', function() {
        for (var inv_a = 1; inv_a <= 5; inv_a++) {
            var a = 1 / inv_a;
            chai.expect(delta.nascent_delta_integral(a, -10, 10)).to.be.closeTo(1.0, epsilon);
            chai.expect(delta.nascent_delta_integral(a, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)).to.be.closeTo(1.0, epsilon);
        }
    });
    it ('Returns dirac_delta_integral(lowerBound, upperBound) when a = 0', function() {
        chai.expect(delta.nascent_delta_integral(0, -1, 1)).to.equal(delta.dirac_delta_integral(-1, 1));
        chai.expect(delta.nascent_delta_integral(0, 1, -1)).to.equal(delta.dirac_delta_integral(1, -1));
        chai.expect(delta.nascent_delta_integral(0, -1, 0)).to.equal(delta.dirac_delta_integral(-1, 0));
        chai.expect(delta.nascent_delta_integral(0, 0, -1)).to.equal(delta.dirac_delta_integral(0, -1));
    });
    it ('Ascends monotonically', function() {
        for (var inv_a = 1; inv_a <= 5; inv_a++) {
            var a = 1 / inv_a;
            var lastX = NaN;
            for (var x = -3; x <= 3; x++) {
                if (!isNaN(lastX)) {
                    chai.expect(delta.nascent_delta_integral(x)).to.not.be.below(delta.nascent_delta_integral(lastX));
                }
                lastX = x;
            }
            chai.expect(delta.nascent_delta_integral(a, -10, 10)).to.be.closeTo(1.0, epsilon);
            chai.expect(delta.nascent_delta_integral(a, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)).to.be.closeTo(1.0, epsilon);
        }
    });
    it ('Has an indefinite integral of 1', function(){
        for (var inv_a = 1; inv_a <= 5; inv_a++) {
            var a = 1 / inv_a;
            chai.expect(delta.nascent_delta_integral(a, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)).to.be.closeTo(1.0, epsilon);
        }
    });
});