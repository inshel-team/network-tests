import expect from 'expect'

/*
Actors
- Alice

Scenario
- Alice connect to IS Network
- Alice approve main key
- Alice create a new contract
*/

const createNewContract = async ({ ISNode, JSEncrypt, mainKey }) => {
  const alice = new ISNode()
  
  await alice.connect()
  const { key: mainKeyId } = await alice.keys.approve(mainKey)
  const { id } = await alice.contracts.create(mainKeyId, { testContract: true })

  expect(typeof id).toBe('number')
}

createNewContract.meta = {
  chapter: 'Contracts',
  title: 'Create new contract',
  need: {
    mainKey: true
  }
}

export default createNewContract