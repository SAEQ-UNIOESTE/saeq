import 'crypto-js';

export default class Cifrador {
  cifrar(dado:string, chave:string, iv:string) {
    var hash_da_chave = require("crypto-js");
    hash_da_chave = hash_da_chave.HmacSHA512(chave, iv)
    hash_da_chave = hash_da_chave.toString()

    var cifragem = require('crypto-js')
    var cifrado = cifragem.AES.encrypt(dado, hash_da_chave)
    return cifrado.toString()
  }

  descifrar(dado:string, chave:string, iv:string) {
    var hash_da_chave = require("crypto-js");
    hash_da_chave = hash_da_chave.HmacSHA512(chave, iv)
    hash_da_chave = hash_da_chave.toString()

    var descifragem = require('crypto-js')
    var descifrado = descifragem.AES.decrypt(dado, hash_da_chave)
    return descifrado.toString(descifragem.enc.Utf8)
  }
}