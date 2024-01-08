export const listOpenFiles = async () => {
  const { stdout } = await promisify(exec)("lsof -c node | awk '{print $9}'")

  // only show our test files
  const openFiles = stdout.split('\n').filter(str => str.endsWith('case.txt'))

  console.log('***** open files:\n', openFiles, '\n-------------')
}
