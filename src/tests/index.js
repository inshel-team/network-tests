import contractsCreateNewContract from './contracts/create-new-contract'
import contractsDelete from './contracts/delete'
import contractsPublish from './contracts/publish'
import contractsUpdate from './contracts/update'

import invitesCreateInvite from './invites/create-invite'

import keysApproveInvalidKey from './keys/approve-invalid-key'
import keysApproveKey from './keys/approve-key'
import keysCreateNewContractKeyForbidden from './keys/create-new-contract-key-forbidden'
import keysCreateNewContractKey from './keys/create-new-contract-key'
import keysCreateNewKey from './keys/create-new-key'
import keysInvalidInvite from './keys/invalid-invite'
import keysUsedInvite from './keys/used-invite'

import lambdaExecuteError from './lambda/execute-error'
import lambdaExecute from './lambda/execute'

import raysSubscribeForbidden from './rays/subscribe-forbidden'
import raysSubscribe from './rays/subscribe'

export default [
  contractsCreateNewContract,
  contractsDelete,
  contractsPublish,
  contractsUpdate,
  
  invitesCreateInvite,

  keysApproveInvalidKey,
  keysApproveKey,
  keysCreateNewContractKeyForbidden,
  keysCreateNewContractKey,
  keysCreateNewKey,
  keysInvalidInvite,
  keysUsedInvite,

  lambdaExecuteError,
  lambdaExecute,

  raysSubscribeForbidden,
  raysSubscribe
].sort((a, b) => {
  if (a.meta.chapter !== b.meta.chapter) {
    return a.meta.chapter < b.meta.chapter ? -1 : 1
  }

  return a.meta.title < b.meta.title ? -1 : 1
})