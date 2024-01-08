import { createProfiler } from './profiler.js'

const getAllFactors = num => {
  const profiler = createProfiler('factor')

  const t1 = profiler.start()

  const factors = []

  for (let i = 1; i <= num; i += 1) {
    if (num % i === 0) {
      factors.push(i)
      num /= i
    }
  }

  const t2 = profiler.end()

  return factors
}

const factors = getAllFactors(process.argv[2])
console.log(`Factors of ${process.argv[2]} = ${factors}`)
