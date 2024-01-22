import { CreditCardManagementSystem } from "../../src/service/creditCardManagement";

let creditCardManagementSystem: CreditCardManagementSystem;

describe("Credit Card management", () => {
  describe("Success", () => {
    beforeEach(() => {
      creditCardManagementSystem = new CreditCardManagementSystem();
    });

    test("add new credit card", () => {
      const result = creditCardManagementSystem.addCreditCard(
        "Kapil Patil",
        50000
      );
      expect(result.statusCode).toBe(200);
    });

    test("get all credit card holder details", () => {
      creditCardManagementSystem.addCreditCard("Kapil Patil", 50000);

      const result = creditCardManagementSystem.getAllCreditCardHolderList();
      expect(result.length).toBe(1);
      expect(result[0].amount).toBe(50000);
    });

    test("update credit limit for credit card holder", () => {
      const creditCard = creditCardManagementSystem.addCreditCard(
        "Kapil Patil",
        50000
      );

      const result = creditCardManagementSystem.updateAmount(
        creditCard.id,
        70000
      );
      expect(result).toBe(true);

      const updatedCard = creditCardManagementSystem.getCreditCard(
        creditCard.id
      );
      expect(updatedCard?.amount).toBe(70000);
    });

    test("delete specific credit card holder details from the list", () => {
      const creditCard = creditCardManagementSystem.addCreditCard(
        "Kapil Patil",
        50000
      );

      const result = creditCardManagementSystem.deleteCreditCard(creditCard.id);

      expect(result).toBe(true);

      const updatedCard = creditCardManagementSystem.getCreditCard(
        creditCard.id
      );
      expect(updatedCard).toBeUndefined();
    });

    test("get details for specific credit card holder", () => {
      const creditCard = creditCardManagementSystem.addCreditCard(
        "Kapil Patil",
        50000
      );

      const result = creditCardManagementSystem.getCreditCard(creditCard.id);

      expect(result?.accountHolder).toBe("Kapil Patil");
      expect(result?.id).toBe(creditCard.id);
    });

    describe("Failure", () => {
      test("Card Number already exists", () => {
        let creditCard: any;
        for (let noOfCards = 0; noOfCards <= 5; noOfCards++) {
          creditCard = creditCardManagementSystem.addCreditCard(
            "Kapil Patil",
            50000
          );
          if (creditCard.statusCode === 409) {
            break;
          }
        }
        expect(creditCard.statusCode).toBe(409);
      });

      test("update credit limit for credit card holder - no credit card found", () => {
        const creditCard = creditCardManagementSystem.addCreditCard(
          "Kapil Patil",
          50000
        );

        const result = creditCardManagementSystem.updateAmount("1234", 70000);
        expect(result).toBe(false);

        const updatedCard = creditCardManagementSystem.getCreditCard(
          creditCard.id
        );
        expect(updatedCard?.amount).toBe(50000);
      });

      test("delete specific credit card holder details from the list - no credit card found", () => {
        const creditCard = creditCardManagementSystem.addCreditCard(
          "Kapil Patil",
          50000
        );

        const result = creditCardManagementSystem.deleteCreditCard("12344");

        expect(result).toBe(false);

        const updatedCard = creditCardManagementSystem.getCreditCard(
          creditCard.id
        );
        expect(updatedCard).not.toBeUndefined();
      });
    });
  });

  describe("Payment gateway", () => {
    test("charge card with amount", () => {
      const creditCard = creditCardManagementSystem.addCreditCard(
        "Kapil Patil",
        50000
      );

      const cardDetails = creditCardManagementSystem.getCreditCard(
        creditCard.id
      );

      const result = creditCardManagementSystem.chargeAmount(
        cardDetails?.cardNumber || "",
        10000
      );

      expect(result).toBe(true);

      const cardDetailsAfterCharging = creditCardManagementSystem.getCreditCard(
        creditCard.id
      );

      expect(cardDetailsAfterCharging?.amount).toBe(40000);
    });

    test("credit card with amount", () => {
      const creditCard = creditCardManagementSystem.addCreditCard(
        "Kapil Patil",
        50000
      );

      const cardDetails = creditCardManagementSystem.getCreditCard(
        creditCard.id
      );

      const result = creditCardManagementSystem.creditAmount(
        cardDetails?.cardNumber || "",
        10000
      );

      expect(result).toBe(true);

      const cardDetailsAfterCharging = creditCardManagementSystem.getCreditCard(
        creditCard.id
      );

      expect(cardDetailsAfterCharging?.amount).toBe(60000);
    });
  });
});
