const noopProfiler = {
  start() {},
  end() {},
}

class Profiler {
  constructor(label) {
    this.label = label
    this.startTime = null
  }

  start() {
    this.startTime = process.hrtime.bigint()
  }

  end() {
    const end = process.hrtime.bigint()
    console.log(`${this.label} took ${end - this.startTime} nanoseconds`)
  }
}

export const createProfiler = label => {
  if (process.env.NODE_ENV === 'production') {
    return noopProfiler
  }

  return new Profiler(label)
}
