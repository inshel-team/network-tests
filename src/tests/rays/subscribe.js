import expect from 'expect'

/*
Actors
- Alice
- Bob: Test contract node (src/contract/index.js)

Scenario
- Alice connect to IS Network
- Alice calls Bob subscribe to ray "#test-${Date.now()}"
- Bob approve (see case "rays.subscribe" in src/contract/index.js)
- Bob send message '{"answer":42}'
- Alice validate message
*/

const execute = async ({ ISNode, key, contract }) => {
  const alice = new ISNode()
  const rayId = `#test-${Date.now()}`
  
  await alice.connect()
  const { key: keyId } = await alice.keys.approve(key)

  const message = await new Promise(async (resolve, reject) => {
    let resolved = false
    await alice.rays.subscribe(keyId, { contract, ray: rayId }, (contract, ray, message) => {
      resolved = true
      resolve(message)
    })

    setTimeout(() => {
      if (resolved) {
        return
      }

      reject('Timeout')
    }, 2000)
  })

  expect(message)
    .toEqual(JSON.stringify({ answer: 42 }))
}

execute.meta = {
  chapter: 'Rays',
  title: 'subscribe',
  need: {
    key: true,
    contract: true
  }
}

export default execute