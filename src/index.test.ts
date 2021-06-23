import { makeRandom } from '.'

const N = 100000

describe('makeRandom', () => {
  describe('seed usage', () => {
    const integerSeries = (n: number, seed?: string) => {
      const r = makeRandom(seed)
      return range(n)
        .map(_ => r.integer())
        .join()
    }

    test('same seed should give same result', () => {
      const series1 = integerSeries(10, 'aaa')
      const series2 = integerSeries(10, 'aaa')

      expect(series1).toMatchInlineSnapshot(`"4,5,3,5,5,6,0,3,8,1"`)
      expect(series2).toMatchInlineSnapshot(`"4,5,3,5,5,6,0,3,8,1"`)

      expect(series1).toEqual(series2)
    })

    test('different seeds should give different results', () => {
      const series1 = integerSeries(10, 'aaa')
      const series2 = integerSeries(10, 'bbb')

      expect(series1).toMatchInlineSnapshot(`"4,5,3,5,5,6,0,3,8,1"`)
      expect(series2).toMatchInlineSnapshot(`"8,1,9,4,7,6,0,0,2,0"`)

      expect(series1).not.toEqual(series2)
    })

    test('no seed should give different results every time', () => {
      const series1 = integerSeries(10)
      const series2 = integerSeries(10)

      expect(series1).not.toEqual(series2)
    })
  })

  describe('integer', () => {
    test('1-digit numbers', () => {
      const r = makeRandom('test-seed-integer-1')

      expect(r.integer(0, 10)).toMatchInlineSnapshot(`1`)
      expect(r.integer(0, 10)).toMatchInlineSnapshot(`6`)
      expect(r.integer(0, 10)).toMatchInlineSnapshot(`7`)
      expect(r.integer(0, 10)).toMatchInlineSnapshot(`9`)
      expect(r.integer(0, 10)).toMatchInlineSnapshot(`4`)
      expect(r.integer(0, 10)).toMatchInlineSnapshot(`5`)
      expect(r.integer(0, 10)).toMatchInlineSnapshot(`6`)
    })

    test('2-digit numbers', () => {
      const r = makeRandom('test-seed-integer-2')

      expect(r.integer(0, 100)).toMatchInlineSnapshot(`48`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`96`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`57`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`32`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`48`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`91`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`12`)
    })

    test('4-digit numbers starting at 1000', () => {
      const r = makeRandom('test-seed-integer-3')

      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`3611`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`2495`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`5192`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`7800`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`7264`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`6204`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`1484`)
    })

    test('bins', () => {
      const r = makeRandom('test-seed-integer-4')

      const values = range(N).map(_ => r.integer(0, 10))

      // results are distributed uniformly
      expect(makeBins(values)).toMatchInlineSnapshot(`
        Object {
          "00": 10075,
          "01": 10020,
          "02": 10046,
          "03": 10090,
          "04": 9931,
          "05": 10065,
          "06": 9907,
          "07": 9935,
          "08": 9933,
          "09": 9998,
        }
      `)
    })
  })

  describe('decimal', () => {
    test('between 0 and 1', () => {
      const r = makeRandom('test-seed-decimal-1')

      expect(r.decimal()).toMatchInlineSnapshot(`0.23034211402365806`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.8291306383669392`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.03282738240691978`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.051792298514131904`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.5741764269790675`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.3233072493533149`)
    })

    test('bins', () => {
      const r = makeRandom('test-seed-decimal-2')

      const values = range(N).map(_ => r.decimal(0, 10))

      // results are distributed uniformly
      expect(makeBins(values)).toMatchInlineSnapshot(`
        Object {
          "00": 5087,
          "01": 10058,
          "02": 9876,
          "03": 9928,
          "04": 10055,
          "05": 9894,
          "06": 9917,
          "07": 10201,
          "08": 10022,
          "09": 10060,
          "10": 4902,
        }
      `)
    })
  })

  describe('normal', () => {
    test('between 0 and 1', () => {
      const r = makeRandom('test-seed-normal-1')

      expect(r.normal()).toMatchInlineSnapshot(`0.541321533355672`)
      expect(r.normal()).toMatchInlineSnapshot(`0.4597749532378128`)
      expect(r.normal()).toMatchInlineSnapshot(`0.6423817414005604`)
      expect(r.normal()).toMatchInlineSnapshot(`0.5031053810828525`)
      expect(r.normal()).toMatchInlineSnapshot(`0.2527318663912928`)
      expect(r.normal()).toMatchInlineSnapshot(`0.6343028108807234`)
    })

    test('bins', () => {
      const r = makeRandom('test-seed-normal-2')

      const values = range(N).map(_ => r.normal(0, 10))

      // results are distributed normally
      expect(makeBins(values)).toMatchInlineSnapshot(`
        Object {
          "01": 19,
          "02": 564,
          "03": 6134,
          "04": 24125,
          "05": 38232,
          "06": 24253,
          "07": 6034,
          "08": 611,
          "09": 27,
          "10": 1,
        }
      `)
    })
  })

  describe('coinFlip', () => {
    test('snapshots', () => {
      const r = makeRandom('test-seed-coinflip-1')

      expect(r.coinFlip()).toMatchInlineSnapshot(`false`)
      expect(r.coinFlip()).toMatchInlineSnapshot(`false`)
      expect(r.coinFlip()).toMatchInlineSnapshot(`true`)
      expect(r.coinFlip()).toMatchInlineSnapshot(`false`)
      expect(r.coinFlip()).toMatchInlineSnapshot(`true`)
    })

    test('bins', () => {
      const r = makeRandom('test-seed-coinflip-2')

      const values = range(N).map(_ => r.coinFlip())
      expect(makeBins(values)).toMatchInlineSnapshot(`
        Object {
          "false": 50172,
          "true": 49828,
        }
      `)
    })
  })

  describe('probability', () => {
    test('20%', () => {
      const r = makeRandom('test-seed-probability-1')

      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
    })

    test('60%', () => {
      const r = makeRandom('test-seed-probability-2a')

      expect(r.probability(0.6)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
    })

    test('bins: 10%', () => {
      const r = makeRandom('test-seed-probability-3')

      const values = range(N).map(_ => r.probability(0.1))
      expect(makeBins(values)).toMatchInlineSnapshot(`
        Object {
          "false": 90165,
          "true": 9835,
        }
      `)
    })
  })

  describe('pick', () => {
    test('from array', () => {
      const r = makeRandom('test-seed-pick-1')
      const options = [1, 2, 3]

      expect(r.pick(options)).toMatchInlineSnapshot(`2`)
      expect(r.pick(options)).toMatchInlineSnapshot(`3`)
      expect(r.pick(options)).toMatchInlineSnapshot(`2`)
      expect(r.pick(options)).toMatchInlineSnapshot(`3`)
      expect(r.pick(options)).toMatchInlineSnapshot(`2`)
      expect(r.pick(options)).toMatchInlineSnapshot(`1`)
      expect(r.pick(options)).toMatchInlineSnapshot(`3`)
      expect(r.pick(options)).toMatchInlineSnapshot(`3`)
    })

    test('from object', () => {
      const r = makeRandom('test-seed-pick-2')
      const options = { a: 'fee', b: 'fi', c: 'fo', d: 'fum' }

      expect(r.pick(options)).toMatchInlineSnapshot(`"fi"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fo"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fee"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fi"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fum"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fum"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fee"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fo"`)
    })

    test('bins', () => {
      const r = makeRandom('test-seed-pick-3')
      const options = [1, 2, 3, 4]

      const values = range(N).map(_ => r.pick(options))
      expect(makeBins(values)).toMatchInlineSnapshot(`
        Object {
          "01": 24991,
          "02": 25015,
          "03": 25017,
          "04": 24977,
        }
      `)
    })
  })

  describe('plusOrMinus', () => {
    test('snapshots', () => {
      const r = makeRandom('test-seed-plusOrMinus-1a')

      expect(r.plusOrMinus()).toMatchInlineSnapshot(`-1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`-1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`1`)
    })

    test('bins', () => {
      const r = makeRandom('test-seed-plusOrMinus-2')

      const values = range(N).map(_ => r.plusOrMinus())
      expect(makeBins(values)).toMatchInlineSnapshot(`
        Object {
          "-1": 49985,
          "01": 50015,
        }
      `)
    })
  })

  describe('alpha', () => {
    test('1 letter', () => {
      const r = makeRandom('test-seed-alpha-1')

      expect(r.alpha(1)).toMatchInlineSnapshot(`"v"`)
      expect(r.alpha(1)).toMatchInlineSnapshot(`"p"`)
      expect(r.alpha(1)).toMatchInlineSnapshot(`"x"`)
      expect(r.alpha(1)).toMatchInlineSnapshot(`"q"`)
      expect(r.alpha(1)).toMatchInlineSnapshot(`"h"`)
    })

    test('5 letters', () => {
      const r = makeRandom('test-seed-alpha-2')

      expect(r.alpha(5)).toMatchInlineSnapshot(`"ateyi"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"wigig"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"wpkjy"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"xehtt"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"lktsz"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"nwwdo"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"wymda"`)
    })

    test('10 letters', () => {
      const r = makeRandom('test-seed-alpha-3')

      expect(r.alpha(10)).toMatchInlineSnapshot(`"yzfzrqnlql"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"twlpmfthyf"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"xgkvinednw"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"vkxggeuhop"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"vulhxjkctg"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"nuijojcnkj"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"tecvjpxufx"`)
    })
  })
})

const range = (size: number, start = 0) => new Array(size).fill(0).map((_, i) => i + start)

const makeBins = (values: any[]) => {
  return values.reduce((result, d) => {
    const bin =
      typeof d === 'number'
        ? Math.round(d)
            .toString()
            .padStart(2, '0')
        : d.toString()

    return { ...result, [bin]: (result[bin] ?? 0) + 1 }
  }, {} as Record<string, number>)
}
