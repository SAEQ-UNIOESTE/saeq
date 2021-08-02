import 'crypto-js';

class Cifrador {
  constructor(dado, chave, iv) {
    this.dado  = dado
    this.chave = chave
    this.iv    = iv
  }

  cifrar() {
    var hash_da_chave = require("crypto-js");
    hash_da_chave = hash_da_chave.HmacSHA512(this.chave, this.iv)
    hash_da_chave = hash_da_chave.toString()

    var cifragem = require('crypto-js')
    var cifrado = cifragem.AES.encrypt(this.dado, hash_da_chave)
    return cifrado.toString()
  }

  descifrar() {
    var hash_da_chave = require("crypto-js");
    hash_da_chave = hash_da_chave.HmacSHA512(this.chave, this.iv)
    hash_da_chave = hash_da_chave.toString()

    var descifragem = require('crypto-js')
    var descifrado = descifragem.AES.decrypt(this.dado, hash_da_chave)
    return descifrado.toString(descifragem.enc.Utf8)
  }
}

export default Cifrador