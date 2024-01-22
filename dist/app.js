"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const src_1 = require("./src");
const gateway_1 = require("./src/service/gateway");
const validationSchema_1 = require("./src/schema/validationSchema");
const zod_1 = require("zod");
dotenv_1.default.config();
// Create an instance of the CreditCardManagementSystem
const creditCardManagementSystem = new src_1.CreditCardManagementSystem();
// Create an instance of Express
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use(express_1.default.json());
// Route to add a credit card
app.post("/credit-cards", (req, res) => {
    try {
        console.log("req: ", req.body);
        // console.log("body", req.body);
        validationSchema_1.postRequestSchema.parse(req.body);
        const { name, amount } = req.body;
        const success = creditCardManagementSystem.addCreditCard(name, amount);
        if (success) {
            return res
                .status(201)
                .json({ message: "Credit card added successfully." });
        }
        else {
            return res
                .status(400)
                .json({
                error: "Credit card with the same card number already exists.",
            });
        }
    }
    catch (err) {
        const error = [];
        if (err instanceof zod_1.ZodError) {
            console.log("Schema Validtion Failed");
            err.issues.forEach((issue) => {
                error.push(`${issue.code} - ${issue.path} - ${issue.message}`);
            });
        }
        return res.status(400).json(error);
    }
});
// Route to get all credit card
app.get("/credit-cards/", (req, res) => {
    const cardNumber = req.params.cardNumber;
    const creditCard = creditCardManagementSystem.getAllCreditCardHolderList();
    console.log("creditCard: ", creditCard);
    if (creditCard) {
        return res.status(200).json(creditCard);
    }
    else {
        return res.status(404).json({ error: "Credit card not found." });
    }
});
// Route to get a credit card
app.get("/credit-cards/:cardNumber", (req, res) => {
    const cardNumber = req.params.cardNumber;
    const creditCard = creditCardManagementSystem.getCreditCard(cardNumber);
    console.log(creditCard);
    if (creditCard) {
        return res.status(200).json({
            cardNumber: creditCard.cardNumber,
            amount: creditCard.amount,
        });
    }
    else {
        return res.status(404).json({ error: "Credit card not found." });
    }
});
// Route to update the amount of a credit card
app.put("/credit-cards/:cardNumber", (req, res) => {
    const cardNumber = req.params.cardNumber;
    const { amount } = req.body;
    if (!amount) {
        return res.status(400).json({ error: "Amount is required." });
    }
    const success = creditCardManagementSystem.updateAmount(cardNumber, amount);
    if (success) {
        return res.status(200).json({ message: "Amount updated successfully." });
    }
    else {
        return res.status(404).json({ error: "Credit card not found." });
    }
});
// Route to delete a credit card
app.delete("/credit-cards/:cardNumber", (req, res) => {
    const cardNumber = req.params.cardNumber;
    const success = creditCardManagementSystem.deleteCreditCard(cardNumber);
    if (success) {
        return res
            .status(200)
            .json({ message: "Credit card deleted successfully." });
    }
    else {
        return res.status(404).json({ error: "Credit card not found." });
    }
});
// Route to process a credit card transaction
app.post("/payment-gateway", (req, res) => {
    const { cardNumber, amount } = req.body;
    if (!cardNumber || !amount) {
        return res
            .status(400)
            .json({ error: "Card number and amount are required." });
    }
    const success = gateway_1.PaymentGateway.processTransaction(cardNumber, amount);
    if (success) {
        return res.status(200).json({ message: "Transaction successful." });
    }
    else {
        return res.status(400).json({ error: "Transaction failed." });
    }
});
// Start the server
app.listen(port, () => {
    console.log("Server is running on port 3000");
});
