import {
  encrypt,
  decrypt,
  generateToken,
  validateToken,
} from "../../src/service/security";

describe("encrypt", () => {
  test("encrypt plaintext", () => {
    const encryptedText = encrypt("Please encrypt this");

    expect(encryptedText).toBe("Qmfbtf!fodszqu!uijt");
  });
});

describe("decrypt", () => {
  test("decrypt text", () => {
    const encryptedText = decrypt("Qmfbtf!fodszqu!uijt");

    expect(encryptedText).toBe("Please encrypt this");
  });
});

describe("token validation", () => {
  test("check for valid token", () => {
    const token = generateToken();

    const isValid = validateToken(token);

    expect(isValid).toBe(true);
  });

  test("check for invalid token", () => {
    const isValid = validateToken("my-token");

    expect(isValid).toBe(false);
  });
});
