import expect from 'expect'

/*
Actors
- Alice

Scenario
- Alice connect to IS Network
- Alice approve main key
- Alice create new contract
- Alice publish contract
*/

const publishContract = async ({ ISNode, mainKey }) => {
  const alice = new ISNode()
  
  await alice.connect()
  const { key: mainKeyId } = await alice.keys.approve(mainKey)
  const { id } = await alice.contracts.create(mainKeyId, { testContract: true })
  await alice.contracts.publish(mainKeyId, id)
}

publishContract.meta = {
  chapter: 'Contracts',
  title: 'Publish',
  need: {
    mainKey: true
  }
}

export default publishContract