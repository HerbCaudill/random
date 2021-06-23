Utility random functions. Uses `random-seed` so the randomizer can be seeded if you need determinism (e.g. for testing).

## Installation

```bash
yarn add @herbcaudill/random
```

## Usage

```js
import { makeRandom } from '@herbcaudill/random'

// if you provide a seed, you will get the same sequence of random numbers each time
const r = makeRandom('12345')

// if you don't provide a seed, Math.random() will be used to generate a seed; so you'll get a different sequence every time.
const r = makeRandom()
```

### `r.integer(min = 0, max = 10)`

Returns an integer greater than or equal to `min`, and less than `max`, with uniform distribution.

```js
const a = r.integer() // returns a number between 0 and 10 (could be 0, could be 9, will never be 10)
// a = 7

const b = r.integer(1, 5) // returns a number between 1 and 5 (could be 1, could be 4, will never be 5)
// b = 4
```

### `r.decimal(min = 0, max = 1)`

Returns an decimal number greater than `min`, and less than `max`, with uniform distribution.

```js
const a = r.decimal() // returns a number between 0 and 1 (greater than 0, less than 1)
// a = 0.389867019774243

const b = r.decimal(1, 5) // returns a number between 1 and 5 (greater than 1, less than 5)
// b = 4.217256259412135

const values = range(100000).map(_ => r.decimal(0, 10))

// 0 -  1: 9889
// 1 -  2: 10030
// 2 -  3: 9947
// 3 -  4: 10042
// 4 -  5: 10009
// 5 -  6: 9902
// 6 -  7: 10059
// 7 -  8: 10065
// 8 -  9: 10108
// 9 - 10: 9949
```

### `r.normal(min = 0, max = 1)`

Returns a decimal number greater than `min`, and less than `max`, with normal distribution.

```js
const a = r.normal() // returns a number between 0 and 1 (greater than 0, less than 1)
// a = 0.389867019774243

const b = r.normal(1, 5) // returns a number between 1 and 5 (greater than 1, less than 5)

const values = range(100000).map(_ => r.normal(0, 10))

// 0 -  1: 3
// 1 -  2: 136
// 2 -  3: 2143
// 3 -  4: 13704
// 4 -  5: 34150
// 5 -  6: 34161
// 6 -  7: 13452
// 7 -  8: 2127
// 8 -  9: 120
// 9 - 10: 4
```

### `r.probability(p)`

Returns `true` or `false`, with `p` probability of being true (where `p` is a percentage between 0% and 100%).

```js
const a = r.probability(0.1) // 10% chance of returning `true`, 90% chance of returning `false`.
// a = false
```

### `r.coinFlip()`

Returns `true` or `false`, with an even chance of being either one.

```js
const a = r.coinFlip() // 50% chance of returning `true`, 50% chance of returning `false`.
// a = true
```

### `r.plusOrMinus()`

Returns -1 or 1, with an even chance of being either one.

```js
const a = r.plusOrMinus() // 50% chance of returning -1, 50% chance of returning 1.
// a = -1
```

### `r.pick(options)`

Returns a randomly selected value from `options`, with equal probability for each option. The `options` parameter can be an array or an object.

```js
const a = r.pick({ x: 123, y: 42, z: 10000 })
// a = 42

const b = r.pick(['eeny', 'meeny', 'miney', 'mo'])
// b = 'meeny'
```

### `r.alpha(length = 5)`

Returns a string of lowercase characters with the given length.

```js
const a = r.alpha()
// a = 'mlqfq'

const b = r.alpha(10)
// b = 'ycttgbxdnh'
```
