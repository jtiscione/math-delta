# Delta Functions
## Implementation of the Kronecker delta and Dirac delta functions

This module implements the following methods:

* `kronecker_delta(i, j)`: Discrete analog of Dirac delta function δ<sub>ij</sub> for integers `i` and `j`

* `dirac_delta(x)`: Dirac delta function δ(x) defined along the real number line:

![](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dirac_distribution_PDF.svg/325px-Dirac_distribution_PDF.svg.png)

* `dirac_delta_integral(lowerBound, upperBound)`: Integral of the Dirac delta function: &int; δ(x) dx from `lowerBound` to `upperBound`
    > (Returns the indefinite integral from -∞ to +∞ when no arguments given)

* `nascent-delta(a, x)`: Evaluates η<sub>a</sub>(x), a function within a sequence of zero-centered normal distributions

![](https://upload.wikimedia.org/wikipedia/commons/b/b4/Dirac_function_approximation.gif)

* `nascent-delta-integral(a, lowerBound, upperBound)` : Integral of the nascent delta function: &int; η(x) dx from `lowerBound` to `upperBound`
    > (Returns the indefinite integral from -∞ to +∞ when no arguments given)

See [Wikipedia](https://en.wikipedia.org/wiki/Dirac_delta_function) for details.