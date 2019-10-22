/*
Actors
- Alice

Scenario
- Alice connect to IS Network
- Alice approve main key
- Alice create new contract
- Alice delete contract
*/

const deleteContract = async ({ ISNode, mainKey }) => {
  const alice = new ISNode()
  
  await alice.connect()
  const { key: mainKeyId } = await alice.keys.approve(mainKey)
  const { id } = await alice.contracts.create(mainKeyId, { testContract: true })
  await alice.contracts.delete(mainKeyId, id)
}

deleteContract.meta = {
  chapter: 'Contracts',
  title: 'Delete',
  need: {
    mainKey: true
  }
}

export default deleteContract