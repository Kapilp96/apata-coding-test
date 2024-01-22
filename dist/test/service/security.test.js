"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const security_1 = require("../../src/service/security");
describe("encrypt", () => {
    test("encrypt plaintext", () => {
        const encryptedText = (0, security_1.encrypt)("Please encrypt this");
        expect(encryptedText).toBe("Qmfbtf!fodszqu!uijt");
    });
});
describe("decrypt", () => {
    test("decrypt text", () => {
        const encryptedText = (0, security_1.decrypt)("Qmfbtf!fodszqu!uijt");
        expect(encryptedText).toBe("Please encrypt this");
    });
});
describe("token validation", () => {
    test("check for valid token", () => {
        const token = (0, security_1.generateToken)();
        const isValid = (0, security_1.validateToken)(token);
        expect(isValid).toBe(true);
    });
    test("check for invalid token", () => {
        const isValid = (0, security_1.validateToken)("my-token");
        expect(isValid).toBe(false);
    });
});
