import expect from 'expect'

/*
Actors
- Alice
- Bob

Scenario
- Alice connect to IS Network
- Alice approve main key with invites
- Alice create new invite
- Alice use invite to register key
- Bob connect to IS Network
- Bob generate new key
- Bob use invite to register key (expected error)
*/

const usedInvite = async ({ ISNode, JSEncrypt, mainKey }) => {
  const alice = new ISNode()
  const bob = new ISNode()
  
  await alice.connect()
  const { key: mainKeyId } = await alice.keys.approve(mainKey)
  const invite = await alice.invites.create(mainKeyId)
  await alice.keys.create(invite, new JSEncrypt())

  await bob.connect()
  await expect(bob.keys.create(invite, new JSEncrypt()))
    .rejects.toThrow()
}

usedInvite.meta = {
  chapter: 'Keys',
  title: 'Used invite',
  need: {
    mainKey: true,
    invites: true
  }
}

export default usedInvite