export default ({ node, key, contract }, lambda, params, keyId) => {
  switch (lambda) {
    case 'contracts.sign-up':
      return params != null && params.secret === 'value'

    case 'rays.subscribe':
      if (params == null || !Array.isArray(params.rays)) {
        throw new Error('Invalid params')
      }

      setTimeout(() => {
        params.rays.forEach((ray) => {
          if (ray[0] !== '#') {
            return
          }

          node.rays.message(key, contract, ray, JSON.stringify({ answer: 42 }))
        })
      }, 1000)
      return params.rays.map((ray) => ray[0] === '#')

    case 'answer':
      return { question: null, answer: 42 }

    case 'question':
      throw new Error('Task in progress')

    default:
      throw new Error(`Unhandled lamda type: ${JSON.stringify(lambda)}`)
  }
}