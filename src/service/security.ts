import jwt from "jsonwebtoken";
import { secret } from "../constants";

/**
 * Encrypts a given string using a simple encryption algorithm.
 *
 * @param str - The string to be encrypted.
 *
 * @returns {string} - The encrypted string.
 */
export function encrypt(str: string): string {
  let encryptedStr = "";
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    encryptedStr += String.fromCharCode(charCode + 1);
  }
  return encryptedStr;
}

/**
 * Decrypts a given encrypted string using a simple decryption algorithm.
 *
 * @param encryptedStr - The encrypted string to be decrypted.
 *
 * @returns {string} - The decrypted string.
 */
export function decrypt(encryptedStr: string): string {
  let decryptedStr = "";
  for (let i = 0; i < encryptedStr.length; i++) {
    let charCode = encryptedStr.charCodeAt(i);
    decryptedStr += String.fromCharCode(charCode - 1);
  }
  return decryptedStr;
}

/**
 * validateToken: A function to validate a JWT token.
 *
 * @param token - The JWT token to be validated.
 *
 * @returns {boolean} - Returns true if the token is valid, false otherwise.
 */
export function validateToken(token?: string): boolean {
  try {
    const key = decrypt(secret);

    if (!token) {
      return false;
    }

    const valid = jwt.verify(token, key);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Generates a JWT token
 * 
 * @returns token - JWT token
 */
export function generateToken(): string {
  return jwt.sign({ user: "123", name: "Kapil Patil" }, decrypt(secret), {
    expiresIn: "1h",
  });
}
