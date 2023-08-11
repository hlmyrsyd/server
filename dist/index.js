"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8008;
app.use(express_1.default.json());
const data = [];
let transactions = [
    { id: 1, name: "Joe", age: 20 },
    { id: 2, name: "Doe", age: 30 },
    { id: 3, name: "Mhu", age: 40 },
    { id: 4, name: "Maa", age: 50 },
    { id: 5, name: "Naa", age: 60 },
];
// HOMEPAGE
app.get('/', (req, res) => {
    res.json("Welcome to Financial Tracker Homepage");
});
// CREATE (POST)
app.post('/transactions', (req, res) => {
    const newData = req.body;
    data.push(newData);
    res.json(newData);
});
// READ (GET all)
app.get('/transactions', (req, res) => {
    res.json({
        message: "Successfuly get all transactions data",
        transactions,
    });
});
// READ (GET by ID)
app.get('/transactions/:id', (req, res) => {
    // const id = parseInt(req.params.id);
    // const item = data.find((item) => item.id === id);
    const transaction = transactions.find((item) => {
        console.log(item);
        return item.id == req.params.id;
    });
    if (transaction) {
        res.json({
            message: "Successfuly get transaction by ID",
            transaction,
        });
    }
    else {
        res.status(404).json({ message: "Transaction not found, try other ID number" });
    }
});
// UPDATE (PUT)
app.put('/transactions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
        data[index] = Object.assign(Object.assign({}, data[index]), updatedData);
        res.json(data[index]);
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
});
// DELETE
app.delete('/transactions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
        const deletedItem = data.splice(index, 1);
        res.json(deletedItem);
    }
    else {
        res.status(404).json({ message: 'Item not found' });
    }
});
// Start the server on port 8008
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
