"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGateway = void 0;
const constants_1 = require("../constants");
const security_1 = require("./security");
/**
 * PaymentGateway: A class representing a payment gateway.
 */
class PaymentGateway {
    /**
     * Simulated method to process credit card transactions.
     *
     * @param cardNumber - The card number of the credit card.
     * @param amount - The amount associated with the credit card.
     *
     * @returns {boolean} - True if the transaction is successful, false otherwise.
     */
    static processTransaction(database, type, cardNumber, amount) {
        if (type === constants_1.transactionTypes.CHARGE) {
            console.log("process transaction", type, cardNumber, amount);
            const encryptedCardNumber = (0, security_1.encrypt)(cardNumber);
            const creditCard = database.get(encryptedCardNumber);
            if (!creditCard) {
                return false;
            }
            creditCard.setAmount(creditCard.getAmount() - amount);
            return true;
        }
        else if (type === constants_1.transactionTypes.CREDIT) {
            const encryptedCardNumber = (0, security_1.encrypt)(cardNumber);
            const creditCard = database.get(encryptedCardNumber);
            if (!creditCard) {
                return false;
            }
            creditCard.setAmount(creditCard.getAmount() + amount);
            return true;
        }
        return new Error("Invalid transactionType");
    }
}
exports.PaymentGateway = PaymentGateway;
