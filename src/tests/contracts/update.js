import expect from 'expect'

/*
Actors
- Alice

Scenario
- Alice connect to IS Network
- Alice approve main key
- Alice create new contract
- Alice update contract
*/

const updateContract = async ({ ISNode, mainKey }) => {
  const alice = new ISNode()
  
  await alice.connect()
  const { key: mainKeyId } = await alice.keys.approve(mainKey)
  const { id } = await alice.contracts.create(mainKeyId, { testContract: true })
  await alice.contracts.update(mainKeyId, id, { testContract: true, a: 2 })
}

updateContract.meta = {
  chapter: 'Contracts',
  title: 'Update',
  need: {
    mainKey: true
  }
}

export default updateContract