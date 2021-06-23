import seedRandom from 'seed-random'

const IOTA = 0.00000000000001

export const makeRandom = (seed: string = new Date().getTime().toString()) => {
  const randomizer = seedRandom(seed)
  const random = () => randomizer() * (1 - IOTA) + IOTA // ensure non-zero result

  const r = {
    integer: (min: number, max: number) => Math.floor(r.decimal(min, max)),

    decimal: (min: number = 0, max: number = 1) => random() * (max - min) + min,

    normal: (min: number = 0, max: number = 1): number => {
      const u = random()
      const v = random()
      let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
      num = num / 10.0 + 0.5 // Translate to 0 -> 1
      if (num > 1 || num < 0) return r.normal(min, max) // try again if out of bounds
      return num * (max - min) + min
    },

    coinFlip: () => r.probability(0.5),

    probability: (percent: number) => random() < percent,

    pick: (obj: any[] | { [key: string]: any }): any => {
      if (Array.isArray(obj)) {
        // return random element of an array
        return obj[r.integer(0, obj.length)]
      } else {
        // return random property of an object
        return obj[r.pick(Object.keys(obj))]
      }
    },

    plusOrMinus: () => r.pick([-1, 1]),

    alpha: (len: number = 5) => {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
      return '_'.repeat(len).replace(/_/g, () => r.pick(alphabet))
    },
  }

  return r
}

export type Randomizer = ReturnType<typeof makeRandom>
