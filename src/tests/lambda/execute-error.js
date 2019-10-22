import expect from 'expect'

/*
Actors
- Alice
- Bob: Test contract node (src/contract/index.js)

Scenario
- Alice connect to IS Network
- Alice calls Bob execute lambda "question" throught IS Network
*/

const execute = async ({ ISNode, key, contract }) => {
  const alice = new ISNode()
  
  await alice.connect()
  const { key: keyId } = await alice.keys.approve(key)

  expect(alice.contracts.lambda(keyId, contract, 'question', { }))
    .rejects.toThrow()
}

execute.meta = {
  chapter: 'Lambda',
  title: 'execute (error)',
  need: {
    key: true,
    contract: true
  }
}

export default execute