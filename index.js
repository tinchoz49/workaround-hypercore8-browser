const sodium = require('libsodium-wrappers')

;(async () => {
  await sodium.ready
  require('sodium-universal')
  await testHypercore()
})()

async function testHypercore () {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  const pump = require('pump')
  const ram = require('random-access-memory')
  const hypercore = require('@geut/hypercore-promise')

  const writer = hypercore(ram)
  await writer.ready()

  const reader = hypercore(ram, writer.key)
  reader.on('append', async () => {
    console.log((await reader.head(0)).toString())
  })

  const r1 = writer.replicate(true, { live: true })
  const r2 = reader.replicate(false, { live: true })

  pump(r1, r2, r1, err => console.log(err))

  let i = 0
  while (true) {
    await delay(1000)
    await writer.append(Buffer.from(`hello ${i++}`))
  }
}
