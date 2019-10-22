import expect from 'expect'

/*
Actors
- Alice

Scenario
- Alice connect to IS Network
- Alice approve key 
*/

const approveKey = async ({ ISNode, JSEncrypt, key }) => {
  const alice = new ISNode()
  await alice.connect()
  await alice.keys.approve(key)
}

approveKey.meta = {
  chapter: 'Keys',
  title: 'Approve key',
  need: {
    key: true
  }
}

export default approveKey