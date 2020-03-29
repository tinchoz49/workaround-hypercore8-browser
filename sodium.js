const sodium = require('libsodium-wrappers')
const sodiumjs = require('sodium-javascript')

sodiumjs.sodium_memzero = sodiumjs.memzero

sodiumjs.sodium_memcmp = sodium.memcmp
sodiumjs.sodium_is_zero = sodium.is_zero
sodiumjs.sodium_increment = sodium.increment

function copy (from, to) {
  if (from.length > to.length) throw new Error('wrong copy buffer length')
  for (var i = 0; i < from.length; i++) to[i] = from[i]
}

sodiumjs.crypto_kx_keypair = (pk, sk) => {
  const keypair = sodium.crypto_kx_keypair()
  copy(keypair.publicKey, pk)
  copy(keypair.privateKey, sk)
}

sodiumjs.crypto_kx_seed_keypair = (pk, sk, seed) => {
  const keypair = sodium.crypto_kx_seed_keypair(seed)
  copy(keypair.publicKey, pk)
  copy(keypair.privateKey, sk)
}

sodiumjs.crypto_kx_client_session_keys = (srx, stx, lpk, lsk, pk) => {
  const { sharedRx, sharedTx } = sodium.crypto_kx_client_session_keys(lpk, lsk, pk)
  copy(sharedRx, srx)
  copy(sharedTx, stx)
}

sodiumjs.crypto_kx_server_session_keys = (srx, stx, lpk, lsk, pk) => {
  const { sharedRx, sharedTx } = sodium.crypto_kx_server_session_keys(lpk, lsk, pk)
  copy(sharedRx, srx)
  copy(sharedTx, stx)
}

sodiumjs.crypto_aead_xchacha20poly1305_ietf_encrypt = (out, ...args) => {
  const _out = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(...args)
  copy(_out, out)
  return _out.length
}

sodiumjs.crypto_aead_xchacha20poly1305_ietf_decrypt = (out, ...args) => {
  const _out = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(...args)
  copy(_out, out)
  return _out.length
}

sodiumjs.crypto_aead_xchacha20poly1305_ietf_KEYBYTES = sodium.crypto_aead_xchacha20poly1305_ietf_KEYBYTES
sodiumjs.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES = sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES
sodiumjs.crypto_aead_xchacha20poly1305_ietf_ABYTES = sodium.crypto_aead_xchacha20poly1305_ietf_ABYTES
sodiumjs.crypto_kx_SESSIONKEYBYTES = sodium.crypto_kx_SESSIONKEYBYTES
sodiumjs.crypto_kx_PUBLICKEYBYTES = sodium.crypto_kx_PUBLICKEYBYTES
sodiumjs.crypto_kx_SECRETKEYBYTES = sodium.crypto_kx_SECRETKEYBYTES
sodiumjs.crypto_kx_SEEDBYTES = sodium.crypto_kx_SEEDBYTES

module.exports = sodiumjs
