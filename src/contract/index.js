const testRay = (ray) => ray != null && ray[0] === '#'

export default ({ node, key, contract }, lambda, params, keyId) => {
  switch (lambda) {
    case 'contracts.sign-up':
      return params != null && params.secret === 'value'

    case 'rays.subscribe':
      if (params == null || !Array.isArray(params.rays)) {
        throw new Error('Invalid params')
      }

      const result = params.rays.map(testRay)
      if (result.indexOf(true) >= 0) {
        setTimeout(() => {
          params.rays.forEach((ray) => {
            if (!testRay(ray)) {
              return
            }
  
            node.rays.message(key, contract, ray, JSON.stringify({ answer: 42 }))
          })
        }, 1000)
      }
      return result

    case 'answer':
      return { question: null, answer: 42 }

    case 'question':
      throw new Error('Task in progress')

    default:
      throw new Error(`Unhandled lamda type: ${JSON.stringify(lambda)}`)
  }
}