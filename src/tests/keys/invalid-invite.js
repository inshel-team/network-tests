import expect from 'expect'

/*
Actors
- Alice

Scenario
- Alice connect to IS Network
- Alice use invalid invite to register key (expected error)
*/

const invalidInvite = async ({ ISNode, JSEncrypt }) => {
  const alice = new ISNode()
  await alice.connect()
  
  await expect((async () => {
    await alice.keys.create('INVALID INVITE', new JSEncrypt())
  })()).rejects.toThrow()
}

invalidInvite.meta = {
  chapter: 'Keys',
  title: 'Invalid invite',
  need: {
  }
}

export default invalidInvite