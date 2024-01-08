export const printMemoryUsage = () => {
  console.log(
    Object.entries(process.memoryUsage()).reduce((prev, [key, val]) => {
      prev[key] = val / 1024 / 1024 + ' MB'
      return prev
    }, {}),
  )
}
