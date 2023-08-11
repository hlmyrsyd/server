import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = 8008;

app.use(express.json());
app.use(bodyParser.json());

const data: { id: number; name: string; age: number }[] = [];

interface Transaction {
    id: number;
    name: string;
    age: number;
}

let transactions: Transaction[] = [
    { id: 1, name: "Joe", age: 20},
    { id: 2, name: "Doe", age: 30},
    { id: 3, name: "Mhu", age: 40},
    { id: 4, name: "Maa", age: 50},
    { id: 5, name: "Naa", age: 60},
]

// HOMEPAGE
app.get('/', (req: Request, res: Response) => {
    res.json( "Welcome to Financial Tracker Homepage");
});

// CREATE (POST)
app.post('/transactions', (req: Request, res: Response) => {
    // const newData = req.body;
    console.log(req.body);

    transactions.push(req.body);
    console.log(transactions);

    res.json({
        message: "Successfuly adding new transaction",
        transactions,
    });
    
});

// READ (GET all)
app.get('/transactions', (req: Request, res: Response) => {
    res.json({
        message: "Successfuly get all transactions data",
        transactions,
    });
});

// READ (GET by ID)
app.get('/transactions/:id', (req: Request, res: Response) => {
    // const id = parseInt(req.params.id);
    // const item = data.find((item) => item.id === id);
    const transaction = transactions.find((item: any) => {
        console.log(item);
        return item.id == req.params.id;
    });
    if (transaction) {
        res.json({
            message: "Successfuly get transaction by ID",
            transaction,
        });
    } else {
        res.status(404).json({ message: "Transaction not found, try other ID number" });
    }
});

// UPDATE (PUT)
app.put('/transactions/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedData };
        res.json(data[index]);
} else {
    res.status(404).json({ message: 'Item not found' });
}
});

// DELETE
app.delete('/transactions/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
        const deletedItem = data.splice(index, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
}
});

// Start the server on port 8008
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
