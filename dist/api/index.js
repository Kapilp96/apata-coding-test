"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const creditCardManagement_1 = require("./src/service/creditCardManagement");
const validationSchema_1 = require("./src/schema/validationSchema");
const zod_1 = require("zod");
const security_1 = require("./src/service/security");
dotenv_1.default.config();
// Create an instance of the CreditCardManagementSystem
const creditCardManagementSystem = new creditCardManagement_1.CreditCardManagementSystem();
// Create an instance of Express
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use(express_1.default.json());
app.get("/generate-token", (req, res) => {
    return res.json({
        status: 200,
        token: (0, security_1.generateToken)(),
    });
});
// Route to add a credit card
app.post("/credit-cards", (req, res) => {
    try {
        validationSchema_1.postRequestSchema.parse(req.body);
        const { name, amount } = req.body;
        const { token } = req.headers;
        const isValid = (0, security_1.validateToken)(token);
        if (isValid) {
            const result = creditCardManagementSystem.addCreditCard(name, amount);
            if (result.statusCode === 200) {
                return res
                    .status(201)
                    .json({ message: "Credit card added successfully.", id: result.id });
            }
            else {
                return res.status(400).json({
                    error: `Credit card with the same card number already exists, id is ${result.id}`,
                });
            }
        }
        else {
            return res.status(400).json("Invalid Request");
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
    const { token } = req.headers;
    const isValid = (0, security_1.validateToken)(token);
    if (isValid) {
        const creditCard = creditCardManagementSystem.getAllCreditCardHolderList();
        console.log("creditCard: ", creditCard);
        if (creditCard) {
            return res.status(200).json(creditCard);
        }
        else {
            return res.status(404).json({ error: "Credit card not found." });
        }
    }
});
// Route to get a credit card
app.get("/credit-cards/:id", (req, res) => {
    const id = req.params.id;
    const { token } = req.headers;
    const isValid = (0, security_1.validateToken)(token);
    if (isValid) {
        const creditCard = creditCardManagementSystem.getCreditCard(id);
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
    }
});
// Route to update the amount of a credit card
app.put("/credit-cards/:id", (req, res) => {
    const id = req.params.id;
    const { amount } = req.body;
    const { token } = req.headers;
    const isValid = (0, security_1.validateToken)(token);
    if (isValid) {
        if (!amount && amount > 0) {
            return res.status(400).json({ error: "Amount is required." });
        }
        const success = creditCardManagementSystem.updateAmount(id, amount);
        if (success) {
            return res.status(200).json({ message: "Amount updated successfully." });
        }
        else {
            return res.status(404).json({ error: "Credit card not found." });
        }
    }
});
// Route to delete a credit card
app.delete("/credit-cards/:cardNumber", (req, res) => {
    const cardNumber = req.params.cardNumber;
    const { token } = req.headers;
    const isValid = (0, security_1.validateToken)(token);
    if (isValid) {
        const success = creditCardManagementSystem.deleteCreditCard(cardNumber);
        if (success) {
            return res
                .status(200)
                .json({ message: "Credit card deleted successfully." });
        }
        else {
            return res.status(404).json({ error: "Credit card not found." });
        }
    }
});
// Route to process a credit card transaction
app.post("/credit-cards/:cardNumber/charge", (req, res) => {
    const cardNumber = req.params.cardNumber;
    const { amount } = req.body;
    const { token } = req.headers;
    const isValid = (0, security_1.validateToken)(token);
    if (isValid) {
        if (!cardNumber || !amount) {
            return res
                .status(400)
                .json({ error: "Card number and amount are required." });
        }
        const success = creditCardManagementSystem.chargeAmount(cardNumber, amount);
        if (success) {
            return res.status(200).json({ message: "Transaction successful." });
        }
        else {
            return res.status(400).json({ error: "Transaction failed." });
        }
    }
});
app.post("/credit-cards/:cardNumber/credit", (req, res) => {
    const cardNumber = req.params.cardNumber;
    const { amount } = req.body;
    const { token } = req.headers;
    const isValid = (0, security_1.validateToken)(token);
    if (isValid) {
        if (!cardNumber || !amount) {
            return res
                .status(400)
                .json({ error: "Card number and amount are required." });
        }
        const success = creditCardManagementSystem.creditAmount(cardNumber, amount);
        if (success) {
            return res.status(200).json({ message: "Transaction successful." });
        }
        else {
            return res.status(400).json({ error: "Transaction failed." });
        }
    }
});
// Start the server
app.listen(port, () => {
    console.log("Server is running on port 3000");
});
