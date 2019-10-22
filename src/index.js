import tests from './tests'
import Environment from './environment'

const runTests = async (options, filter = () => true) => {
  const environment = new Environment(options)

  const filtered = tests.filter(filter)
  try {
    return await Promise.all(filtered.map(async (test) => {
      const result = { ...test.meta }

      const start = Date.now()
      try {
        await test(environment)
      } catch (e) {
        result.error = e
      }
      result.duration = Date.now() - start

      return result
    }))
  } catch (e) {
    throw e
  } finally {
    await environment.ISNode.disconnectAll()
  }
}

export default runTests