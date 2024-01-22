"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.validateToken = exports.decrypt = exports.encrypt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
/**
 * Encrypts a given string using a simple encryption algorithm.
 *
 * @param str - The string to be encrypted.
 *
 * @returns {string} - The encrypted string.
 */
function encrypt(str) {
    let encryptedStr = "";
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        encryptedStr += String.fromCharCode(charCode + 1);
    }
    return encryptedStr;
}
exports.encrypt = encrypt;
/**
 * Decrypts a given encrypted string using a simple decryption algorithm.
 *
 * @param encryptedStr - The encrypted string to be decrypted.
 *
 * @returns {string} - The decrypted string.
 */
function decrypt(encryptedStr) {
    let decryptedStr = "";
    for (let i = 0; i < encryptedStr.length; i++) {
        let charCode = encryptedStr.charCodeAt(i);
        decryptedStr += String.fromCharCode(charCode - 1);
    }
    return decryptedStr;
}
exports.decrypt = decrypt;
/**
 * validateToken: A function to validate a JWT token.
 *
 * @param token - The JWT token to be validated.
 *
 * @returns {boolean} - Returns true if the token is valid, false otherwise.
 */
function validateToken(token) {
    try {
        const key = decrypt(constants_1.secret);
        if (!token) {
            return false;
        }
        const valid = jsonwebtoken_1.default.verify(token, key);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.validateToken = validateToken;
function generateToken() {
    return jsonwebtoken_1.default.sign({ user: "123", name: "Kapil Patil" }, decrypt(constants_1.secret), {
        expiresIn: "1h",
    });
}
exports.generateToken = generateToken;
