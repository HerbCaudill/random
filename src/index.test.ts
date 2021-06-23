import { makeRandom } from '.'

describe('makeRandom', () => {
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

      const values = []
      for (let i = 0; i < 100000; i++) {
        values.push(r.decimal(0, 10))
      }

      const bins = values.reduce((result, d) => {
        const bin = Math.round(d)
          .toString()
          .padStart(2, '0')
        return { ...result, [bin]: (result[bin] ?? 0) + 1 }
      }, {} as Record<string, number>)

      // results are distributed uniformly
      expect(bins).toMatchInlineSnapshot(`
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

      const values = []
      for (let i = 0; i < 100000; i++) {
        values.push(r.normal(0, 10))
      }

      const bins = values.reduce((bins, d) => {
        const bin = Math.round(d)
          .toString()
          .padStart(2, '0')
        return { ...bins, [bin]: (bins[bin] ?? 0) + 1 }
      }, {} as Record<string, number>)

      // results are distributed normally
      expect(bins).toMatchInlineSnapshot(`
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

      const bins = { 0: 0, 1: 0 }
      for (let i = 0; i < 100000; i++) {
        const bin = r.coinFlip() ? 1 : 0
        bins[bin]++
      }

      expect(bins).toMatchInlineSnapshot(`
          Object {
            "0": 50172,
            "1": 49828,
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

      const bins = { 0: 0, 1: 0 }
      for (let i = 0; i < 100000; i++) {
        const bin = r.probability(0.1) ? 1 : 0
        bins[bin]++
      }

      expect(bins).toMatchInlineSnapshot(`
          Object {
            "0": 90165,
            "1": 9835,
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
      const options = { a: 10, b: 20, c: 30 }
      expect(r.pick(options)).toMatchInlineSnapshot(`20`)
      expect(r.pick(options)).toMatchInlineSnapshot(`30`)
      expect(r.pick(options)).toMatchInlineSnapshot(`10`)
      expect(r.pick(options)).toMatchInlineSnapshot(`20`)
      expect(r.pick(options)).toMatchInlineSnapshot(`30`)
      expect(r.pick(options)).toMatchInlineSnapshot(`30`)
      expect(r.pick(options)).toMatchInlineSnapshot(`10`)
      expect(r.pick(options)).toMatchInlineSnapshot(`30`)
    })

    test('bins', () => {
      const r = makeRandom('test-seed-pick-3')
      const options = ['fee', 'fi', 'fo', 'fum']

      const values = []
      for (let i = 0; i < 100000; i++) {
        values.push(r.pick(options))
      }

      const bins = values.reduce((bins, d) => {
        return { ...bins, [d]: (bins[d] ?? 0) + 1 }
      }, {} as Record<string, number>)

      expect(bins).toMatchInlineSnapshot(`
          Object {
            "fee": 24991,
            "fi": 25015,
            "fo": 25017,
            "fum": 24977,
          }
        `)
    })
  })

  describe('plusOrMinus', () => {
    test('snapshots', () => {
      const r = makeRandom('test-seed-plusOrMinus-1a')

      expect(r.plusOrMinus()).toMatchInlineSnapshot(`1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`-1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`-1`)
      expect(r.plusOrMinus()).toMatchInlineSnapshot(`-1`)
    })

    test('bins', () => {
      const r = makeRandom('test-seed-plusOrMinus-2')

      const bins = { [-1]: 0, [1]: 0 } as Record<number, number>
      for (let i = 0; i < 100000; i++) {
        const bin = r.plusOrMinus()
        bins[bin]++
      }

      expect(bins).toMatchInlineSnapshot(`
          Object {
            "-1": 50015,
            "1": 49985,
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
