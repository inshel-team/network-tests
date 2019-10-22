import fs from 'fs'
import path from 'path'

import '@babel/polyfill'
import JSEncrypt from 'node-jsencrypt'

import testContract from './contract'
import { ISNode } from './environment'
import runTests from './'

const mainKey = new JSEncrypt()
mainKey.setPrivateKey(
  fs.readFileSync(
    path.join(process.cwd(), 'environment', 'key'), 
    { encoding: 'utf-8' }
  )
)

const before = async () => {
  const node = new ISNode()
  await node.connect()
  const { key: mainKeyId } = await node.keys.approve(mainKey)
  const { id: contract } = await node.contracts.create(mainKeyId, { testContract: true })
  await node.contracts.publish(mainKeyId, contract)
  node.contracts.subscribe(
    contract, 
    testContract.bind(null, { node, key: mainKeyId, contract })
  )

  return { contract }
}

const start = Date.now()

before()
  .then((options) => runTests({ JSEncrypt, mainKey, key: mainKey, ...options }))
  .then((result) => {
    const delta = Date.now() - start
    let errors = 0
    result.forEach(({ chapter, title, error, duration }) => {
      if (error == null) {
        return
      }

      errors++
      console.error(` [✖] ${chapter}/${title} (${duration}ms)`)
      console.error(error)
      console.error('\n')
    })

    console.log(`Tests [${result.length - errors}/${result.length}] (${delta}ms)`)
    let lastChapter = null
    result.forEach(({ chapter, title, error, duration }) => {
      if (lastChapter !== chapter) {
        console.log(`${lastChapter == null ? '' : '\n'}  ${chapter}`)
      }
      lastChapter = chapter

      console.error(`    [${error == null ? '√' : '✖'}] ${title} (${duration}ms)`)
    })
  }).catch((error) => {
    console.error(error)
  })