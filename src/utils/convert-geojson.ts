// @ts-nocheck
import CryptoJS from 'crypto-js'

export const decryptBuffer = (encryptedBuffer: any, key: string): any => {
  try {
    const wordArray = CryptoJS.enc.Base64.parse(encryptedBuffer)
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: wordArray }, key)
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedText)
  } catch (error) {
    console.error('Shifrlashni ochish xatosi:', error)
    return null
  }
}
