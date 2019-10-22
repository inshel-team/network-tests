import expect from 'expect'

/*
Actors
- Alice
- Bob: Test contract node (src/contract/index.js)

Scenario
- Alice connect to IS Network
- Alice calls Bob subscribe to ray "test-${Date.now()}"
*/

const executeForbidden = async ({ ISNode, key, contract }) => {
  const alice = new ISNode()
  const rayId = `test-${Date.now()}`
  
  await alice.connect()
  const { key: keyId } = await alice.keys.approve(key)

  await expect(alice.rays.subscribe(keyId, { contract, ray: rayId }, (contract, ray, message) => { }))
    .rejects.toThrow()
}

executeForbidden.meta = {
  chapter: 'Rays',
  title: 'subscribe',
  need: {
    key: true,
    contract: true
  }
}

export default executeForbidden