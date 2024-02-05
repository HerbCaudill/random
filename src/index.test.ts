import { makeRandom } from '.'
import { describe, test, expect } from 'vitest'
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
      const r = makeRandom('test-integer-1')

      expect(r.integer()).toMatchInlineSnapshot(`9`)
      expect(r.integer()).toMatchInlineSnapshot(`4`)
      expect(r.integer()).toMatchInlineSnapshot(`5`)
      expect(r.integer()).toMatchInlineSnapshot(`5`)
      expect(r.integer()).toMatchInlineSnapshot(`2`)
      expect(r.integer()).toMatchInlineSnapshot(`4`)
      expect(r.integer()).toMatchInlineSnapshot(`3`)
    })

    test('2-digit numbers', () => {
      const r = makeRandom('test-integer-2')

      expect(r.integer(0, 100)).toMatchInlineSnapshot(`89`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`63`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`65`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`5`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`9`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`2`)
      expect(r.integer(0, 100)).toMatchInlineSnapshot(`79`)
    })

    test('4-digit numbers starting at 1000', () => {
      const r = makeRandom('test-integer-3')

      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`4960`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`9529`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`3573`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`1527`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`6353`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`7391`)
      expect(r.integer(1000, 10000)).toMatchInlineSnapshot(`3710`)
    })

    test('bins', () => {
      const r = makeRandom('test-integer-4')

      const values = range(N).map(_ => r.integer(0, 10))

      // results are distributed uniformly
      expect(makeBins(values)).toMatchInlineSnapshot(`
        {
          "00": 10063,
          "01": 9973,
          "02": 9902,
          "03": 9944,
          "04": 10056,
          "05": 9921,
          "06": 10019,
          "07": 10098,
          "08": 10088,
          "09": 9936,
        }
      `)
    })
  })

  describe('decimal', () => {
    test('between 0 and 1', () => {
      const r = makeRandom('test-decimal-1')

      expect(r.decimal()).toMatchInlineSnapshot(`0.4292064700228548`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.14723043356420581`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.015371525448161942`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.5446138535609452`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.18164017699478657`)
      expect(r.decimal()).toMatchInlineSnapshot(`0.9610019656379952`)
    })

    test('between 1 and 5', () => {
      const r = makeRandom('test-decimal-1b')

      expect(r.decimal(1, 5)).toMatchInlineSnapshot(`1.1600422514670792`)
      expect(r.decimal(1, 5)).toMatchInlineSnapshot(`2.3845902985021237`)
      expect(r.decimal(1, 5)).toMatchInlineSnapshot(`4.217256259412135`)
      expect(r.decimal(1, 5)).toMatchInlineSnapshot(`2.444716519917116`)
      expect(r.decimal(1, 5)).toMatchInlineSnapshot(`1.2022053508470658`)
      expect(r.decimal(1, 5)).toMatchInlineSnapshot(`1.5094622405195832`)
    })

    test('bins', () => {
      const r = makeRandom('test-decimal-2')

      const values = range(N).map(_ => r.decimal(0, 10))

      // results are distributed uniformly
      expect(makeBins(values)).toMatchInlineSnapshot(`
        {
          "00": 9889,
          "01": 10030,
          "02": 9947,
          "03": 10042,
          "04": 10009,
          "05": 9902,
          "06": 10059,
          "07": 10065,
          "08": 10108,
          "09": 9949,
        }
      `)
    })
  })

  describe('normal', () => {
    test('between 0 and 1', () => {
      const r = makeRandom('test-normal-1')

      expect(r.normal()).toMatchInlineSnapshot(`0.6580252756306586`)
      expect(r.normal()).toMatchInlineSnapshot(`0.389867019774243`)
      expect(r.normal()).toMatchInlineSnapshot(`0.4850845519166386`)
      expect(r.normal()).toMatchInlineSnapshot(`0.3088813488704313`)
      expect(r.normal()).toMatchInlineSnapshot(`0.46099556464126157`)
      expect(r.normal()).toMatchInlineSnapshot(`0.536545505735589`)
    })

    test('bins', () => {
      const r = makeRandom('test-normal-2')

      const values = range(N).map(_ => r.normal(0, 10))

      // results are distributed normally
      expect(makeBins(values)).toMatchInlineSnapshot(`
        {
          "00": 3,
          "01": 136,
          "02": 2143,
          "03": 13704,
          "04": 34150,
          "05": 34161,
          "06": 13452,
          "07": 2127,
          "08": 120,
          "09": 4,
        }
      `)
    })
  })

  describe('coinFlip', () => {
    test('snapshots', () => {
      const r = makeRandom('test-coinflip-1')

      expect(r.coinFlip()).toMatchInlineSnapshot(`true`)
      expect(r.coinFlip()).toMatchInlineSnapshot(`true`)
      expect(r.coinFlip()).toMatchInlineSnapshot(`true`)
      expect(r.coinFlip()).toMatchInlineSnapshot(`true`)
      expect(r.coinFlip()).toMatchInlineSnapshot(`true`)
    })

    test('bins', () => {
      const r = makeRandom('test-coinflip-2')

      const values = range(N).map(_ => r.coinFlip())
      expect(makePercentageBins(values)).toEqual('50,50')
    })
  })

  describe('probability', () => {
    test('20%', () => {
      const r = makeRandom('test-probability-1a')

      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.2)).toMatchInlineSnapshot(`false`)
    })

    test('60%', () => {
      const r = makeRandom('test-probability-2a')

      expect(r.probability(0.6)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`false`)
      expect(r.probability(0.6)).toMatchInlineSnapshot(`true`)
    })

    test('bins: 10%', () => {
      const r = makeRandom('test-probability-3a')

      const values = range(N).map(_ => r.probability(0.1))
      expect(makePercentageBins(values)).toEqual('90,10')
    })
  })

  describe('pick', () => {
    test('from array', () => {
      const r = makeRandom('test-pick-1')
      const options = [1, 2, 3]

      expect(r.pick(options)).toMatchInlineSnapshot(`3`)
      expect(r.pick(options)).toMatchInlineSnapshot(`1`)
      expect(r.pick(options)).toMatchInlineSnapshot(`3`)
      expect(r.pick(options)).toMatchInlineSnapshot(`2`)
      expect(r.pick(options)).toMatchInlineSnapshot(`2`)
      expect(r.pick(options)).toMatchInlineSnapshot(`1`)
      expect(r.pick(options)).toMatchInlineSnapshot(`1`)
      expect(r.pick(options)).toMatchInlineSnapshot(`2`)
    })

    test('from object', () => {
      const r = makeRandom('test-pick-2')
      const options = { a: 'fee', b: 'fi', c: 'fo', d: 'fum' }

      expect(r.pick(options)).toMatchInlineSnapshot(`"fee"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fum"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fo"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fi"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fi"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fee"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fo"`)
      expect(r.pick(options)).toMatchInlineSnapshot(`"fi"`)
    })

    test('bins', () => {
      const r = makeRandom('test-pick-3')
      const options = [1, 2, 3, 4]

      const values = range(N).map(_ => r.pick(options))
      expect(makePercentageBins(values)).toEqual('25,25,25,25')
    })
  })

  describe('plusOrMinus', () => {
    test('snapshots', () => {
      const r = makeRandom('test-plusOrMinus-1a')

      expect(r.plusOrMinus()).toMatchInlineSnapshot(`1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`-1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`-1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`-1`)
    })

    test('bins', () => {
      const r = makeRandom('test-plusOrMinus-2')

      const values = range(N).map(_ => r.plusOrMinus())
      expect(makePercentageBins(values)).toEqual('50,50')
    })
  })

  describe('alpha', () => {
    test('1 letter', () => {
      const r = makeRandom('test-alpha-1')

      expect(r.alpha(1)).toMatchInlineSnapshot(`"a"`)
      expect(r.alpha(1)).toMatchInlineSnapshot(`"a"`)
      expect(r.alpha(1)).toMatchInlineSnapshot(`"v"`)
      expect(r.alpha(1)).toMatchInlineSnapshot(`"s"`)
      expect(r.alpha(1)).toMatchInlineSnapshot(`"f"`)
    })

    test('5 letters', () => {
      const r = makeRandom('test-alpha-2')

      expect(r.alpha(5)).toMatchInlineSnapshot(`"vjbpt"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"gkkzn"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"svtni"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"mlqfq"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"saapq"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"aucee"`)
      expect(r.alpha(5)).toMatchInlineSnapshot(`"bxzjw"`)
    })

    test('10 letters', () => {
      const r = makeRandom('test-alpha-3')

      expect(r.alpha(10)).toMatchInlineSnapshot(`"yzoitcydch"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"tlrxaffxtv"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"ysiqdstkkl"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"gdxegsjuie"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"wayawpfluh"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"mlatqpgkfi"`)
      expect(r.alpha(10)).toMatchInlineSnapshot(`"ycttgbxdnh"`)
    })

    test('perf', () => {
      const r = makeRandom('test-alpha-4')
      const values = range(N).map(_ => r.alpha(5))
      expect(values.length).toBe(N)
    })
  })

  describe('shuffle', () => {
    test('snapshots', () => {
      const r = makeRandom('test-shuffle-1')

      expect(r.shuffle([1, 2, 3, 4, 5])).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
          5,
        ]
      `)
      expect(r.shuffle([1, 2, 3, 4, 5])).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          5,
          4,
        ]
      `)
      expect(r.shuffle([1, 2, 3, 4, 5])).toMatchInlineSnapshot(`
        [
          1,
          4,
          2,
          5,
          3,
        ]
      `)
      expect(r.shuffle([1, 2, 3, 4, 5])).toMatchInlineSnapshot(`
        [
          4,
          1,
          5,
          2,
          3,
        ]
      `)
    })
  })

  describe('sample', () => {
    test('snapshots ', () => {
      const r = makeRandom('test-sample-1')

      expect(r.sample([1, 2, 3, 4, 5], 3)).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
      `)
      expect(r.sample([1, 2, 3, 4, 5], 3)).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
      `)
      expect(r.sample([1, 2, 3, 4, 5], 3)).toMatchInlineSnapshot(`
        [
          1,
          3,
          5,
        ]
      `)
      expect(r.sample([1, 2, 3, 4, 5], 3)).toMatchInlineSnapshot(`
        [
          1,
          4,
          2,
        ]
      `)
    })
  })
})

const range = (size: number, start = 0) => new Array(size).fill(null).map((_, i) => i + start)

const makeBins = (values: any[]) =>
  values.reduce((result, d) => {
    const bin =
      typeof d === 'number'
        ? Math.floor(d)
            .toString()
            .padStart(2, '0')
        : d.toString()

    return { ...result, [bin]: (result[bin] ?? 0) + 1 }
  }, {} as Record<string, number>)

const makePercentageBins = (values: any[]) => {
  const counts = makeBins(values)
  return Object.keys(counts)
    .map(d => Math.round((counts[d] * 100) / values.length))
    .join(',')
}
