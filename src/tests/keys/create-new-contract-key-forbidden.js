import expect from 'expect'

/*
Actors
- Alice
- Bob: Test contract node (src/contract/index.js)
- IS Network

Scenario
- Alice connect to IS Network
- Alice generate a new key and calls IS Network to execute "contract.signup" 
- IS Network calls Bob to execute lambda "contracts.sign-up"
  - If Bob returned true as a lambda result, InShel Network registers new key
  - Bob returned something different from true, InShel Network returns this value as error to Alice.
*/

const createNewContractKeyForbidden = async ({ ISNode, JSEncrypt, contract }) => {
  const alice = new ISNode()
  const key = new JSEncrypt()
  
  await alice.connect()
  await expect(alice.contractKeys.signUp(
    contract,
    key.getPublicKey(),
    { secret: 'invalid value' }
  )).rejects.toThrow()
}

createNewContractKeyForbidden.meta = {
  chapter: 'Keys',
  title: 'Create a new contract key (forbidden)',
  need: {
    contract: true
  }
}

export default createNewContractKeyForbidden