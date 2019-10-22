import expect from 'expect'

/*
Actors
- Alice

Scenario
- Alice connect to IS Network
- Alice approve main key with invites
- Alice create invite
*/

const createNewInvite = async ({ ISNode, JSEncrypt, mainKey }) => {
  const alice = new ISNode()
  
  await alice.connect()
  const { key: mainKeyId } = await alice.keys.approve(mainKey)
  const invite = await alice.invites.create(mainKeyId)

  expect(typeof invite).toBe('string')
}

createNewInvite.meta = {
  chapter: 'Invites',
  title: 'Create invite',
  need: {
    mainKey: true,
    invites: true
  }
}

export default createNewInvite