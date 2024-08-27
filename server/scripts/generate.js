const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const private = secp.utils.randomPrivateKey();
console.log("private key: ", toHex(private));

const public = secp.getPublicKey(private);
console.log("public key: ", public);

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

async function signMessage(msg) {
  return secp.sign(hashMessage(msg), PRIVATE_KEY, { recovered: true });
}

function getAddress(publicKey) {
  return keccak256(publicKey.slice(1)).slice(-20);
}

async function recoverKey(message, signature, recoveryBit) {
  const recover = secp.recoverPublicKey(
    hashMessage(message),
    signature,
    recoveryBit
  );
  return recover;
}
