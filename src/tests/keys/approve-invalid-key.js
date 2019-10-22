import expect from 'expect'

/*
Actors
- Alice

Scenario
- Alice connect to IS Network
- Alice approve invalid key (expected error) 
*/

const approveInvalidKey = async ({ ISNode, JSEncrypt }) => {
  const alice = new ISNode()
  await alice.connect()
  
  await expect(alice.keys.approve(new JSEncrypt()))
    .rejects.toThrow()
}

approveInvalidKey.meta = {
  chapter: 'Keys',
  title: 'Approve invalid key'
}

export default approveInvalidKey