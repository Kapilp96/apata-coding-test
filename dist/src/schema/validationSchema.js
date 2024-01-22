"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRequestJsonSchema = exports.processTransactionSchema = exports.postRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const zod_to_json_schema_1 = require("zod-to-json-schema");
exports.postRequestSchema = zod_1.default.object({
    amount: zod_1.default.number().nonnegative("Credit limit must be postive"),
    name: zod_1.default.string().min(1, "Name cannot be empty"),
});
exports.processTransactionSchema = zod_1.default.object({
    cardNumber: zod_1.default.string(),
    amount: zod_1.default.number(),
});
exports.postRequestJsonSchema = (0, zod_to_json_schema_1.zodToJsonSchema)(exports.postRequestSchema);
