import expect from 'expect'

/*
Actors
- Alice
- Bob

Scenario
- Alice connect to IS Network
- Alice approve main key with invites
- Alice create new invite
- Bob connect to IS Network
- Bob generate new key
- Bob use invite to register key in IS Network
- Bob approve new key
*/

const createNewKey = async ({ ISNode, JSEncrypt, mainKey }) => {
  const alice = new ISNode()
  const bob = new ISNode()
  const key = new JSEncrypt()
  
  await alice.connect()
  const { key: mainKeyId } = await alice.keys.approve(mainKey)
  const invite = await alice.invites.create(mainKeyId)

  await bob.connect()
  await bob.keys.create(invite, key)
  
  const result = await bob.keys.approve(key)

  expect(result).toStrictEqual({ key: result.key, invites: 0, contract: null })
}

createNewKey.meta = {
  chapter: 'Keys',
  title: 'Create new key',
  need: {
    mainKey: true,
    invites: true
  }
}

export default createNewKey