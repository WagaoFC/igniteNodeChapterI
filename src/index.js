const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

app.post('/account', (resquest, response) => {
    const { cpf, name } = resquest.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Customer already exists!" });
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    });

    return response.status(201).send();
});

app.get('/statement/:cpf', (resquest, response) => {
    const { cpf } = resquest.params;

    const customer = customers.find(customer => customer.cpf === cpf);

    return response.json(customer.statement);
})

app.listen(3333);