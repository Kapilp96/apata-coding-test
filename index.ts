import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { CreditCardManagementSystem } from "./src/service/creditCardManagement";
import { postRequestSchema } from "./src/schema/validationSchema";
import { ZodError } from "zod";
import { generateToken, validateToken } from "./src/service/security";

dotenv.config();

// Create an instance of the CreditCardManagementSystem
const creditCardManagementSystem = new CreditCardManagementSystem();

// Create an instance of Express
const app: Express = express();
const port = process.env.PORT;
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(express.json());

app.get("/generate-token", (req: Request, res: Response) => {
  return res.json({
    status: 200,
    token: generateToken(),
  });
});

// Route to add a credit card
app.post("/credit-cards", (req: Request, res: Response) => {
  try {
    postRequestSchema.parse(req.body);

    const { name, amount } = req.body;
    const { token } = req.headers;

    const isValid = validateToken(token as string);
    if (isValid) {
      const result = creditCardManagementSystem.addCreditCard(name, amount);
      if (result.statusCode === 200) {
        return res
          .status(201)
          .json({ message: "Credit card added successfully.", id: result.id });
      } else {
        return res.status(400).json({
          error: `Credit card with the same card number already exists, id is ${result.id}`,
        });
      }
    } else {
      return res.status(400).json("Invalid Request");
    }
  } catch (err) {
    const error: string[] = [];

    if (err instanceof ZodError) {
      console.log("Schema Validtion Failed");

      err.issues.forEach((issue) => {
        error.push(`${issue.code} - ${issue.path} - ${issue.message}`);
      });
    }
    return res.status(400).json(error);
  }
});

// Route to get all credit card
app.get("/credit-cards/", (req: Request, res: Response) => {
  const cardNumber = req.params.cardNumber;
  const { token } = req.headers;

  const isValid = validateToken(token as string);
  if (isValid) {
    const creditCard = creditCardManagementSystem.getAllCreditCardHolderList();
    console.log("creditCard: ", creditCard);
    if (creditCard) {
      return res.status(200).json(creditCard);
    } else {
      return res.status(404).json({ error: "Credit card not found." });
    }
  }
});

// Route to get a credit card
app.get("/credit-cards/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { token } = req.headers;

  const isValid = validateToken(token as string);
  if (isValid) {
    const creditCard = creditCardManagementSystem.getCreditCard(id);

    console.log(creditCard);
    if (creditCard) {
      return res.status(200).json(creditCard);
    } else {
      return res.status(404).json({ error: "Credit card not found." });
    }
  }
});

// Route to update the amount of a credit card
app.put("/credit-cards/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { amount } = req.body;
  const { token } = req.headers;

  const isValid = validateToken(token as string);
  if (isValid) {
    if (!amount && amount > 0) {
      return res.status(400).json({ error: "Amount is required." });
    }

    const success = creditCardManagementSystem.updateAmount(id, amount);
    if (success) {
      return res.status(200).json({ message: "Amount updated successfully." });
    } else {
      return res.status(404).json({ error: "Credit card not found." });
    }
  }
});

// Route to delete a credit card
app.delete("/credit-cards/:cardNumber", (req: Request, res: Response) => {
  const cardNumber = req.params.cardNumber;
  const { token } = req.headers;

  const isValid = validateToken(token as string);
  if (isValid) {
    const success = creditCardManagementSystem.deleteCreditCard(cardNumber);
    if (success) {
      return res
        .status(200)
        .json({ message: "Credit card deleted successfully." });
    } else {
      return res.status(404).json({ error: "Credit card not found." });
    }
  }
});

// Route to process a credit card transaction
app.post("/credit-cards/:cardNumber/charge", (req: Request, res: Response) => {
  const cardNumber = req.params.cardNumber;

  const { amount } = req.body;
  const { token } = req.headers;

  const isValid = validateToken(token as string);
  if (isValid) {
    if (!cardNumber || !amount) {
      return res
        .status(400)
        .json({ error: "Card number and amount are required." });
    }

    const success = creditCardManagementSystem.chargeAmount(cardNumber, amount);

    if (success) {
      return res.status(200).json({ message: "Transaction successful." });
    } else {
      return res.status(400).json({ error: "Transaction failed." });
    }
  }
});

// Route to process a credit card transaction
app.post("/credit-cards/:cardNumber/credit", (req: Request, res: Response) => {
  const cardNumber = req.params.cardNumber;

  const { amount } = req.body;
  const { token } = req.headers;

  const isValid = validateToken(token as string);
  if (isValid) {
    if (!cardNumber || !amount) {
      return res
        .status(400)
        .json({ error: "Card number and amount are required." });
    }

    const success = creditCardManagementSystem.creditAmount(cardNumber, amount);

    if (success) {
      return res.status(200).json({ message: "Transaction successful." });
    } else {
      return res.status(400).json({ error: "Transaction failed." });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
