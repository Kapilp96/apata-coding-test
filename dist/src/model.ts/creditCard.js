"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCard = void 0;
/**
 * CreditCard: A class representing a credit card.
 */
class CreditCard {
    /**
     * Constructor of the CreditCard class.
     *
     * @param cardNumber - The card number of the credit card.
     * @param amount - The amount associated with the credit card.
     */
    constructor(accountHolder, cardNumber, amount) {
        this.cardNumber = cardNumber;
        this.amount = amount;
        this.accountHolder = accountHolder;
    }
    /**
     * Getter for the card number of the credit card.
     *
     * @returns {string} - The card number.
     */
    getCardNumber() {
        return this.cardNumber;
    }
    /**
     * Getter for the amount associated with the credit card.
     *
     * @returns {number} - The amount.
     */
    getAmount() {
        return this.amount;
    }
    /**
     * Setter for the amount associated with the credit card.
     *
     * @returns {number} - The amount.
     */
    setAmount(amount) {
        this.amount = amount;
    }
    /**
    * Getter for the holder associated with the credit card.
    *
    * @returns {string} - The amount.
    */
    getAccountHolder() {
        return this.accountHolder;
    }
}
exports.CreditCard = CreditCard;
