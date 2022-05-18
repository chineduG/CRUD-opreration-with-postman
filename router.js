// const { Router } = require('express');
const express = require('express');
// const { get } = require('https');
const route = express.Router();
var accounts = require('./database')


// GET request
route.get('/accounts', (req, res) =>{
    res.json({userData: accounts})
})

// POST request
route.post('/accounts', (req, res)=>{
    const incomingAccounts = req.body
    accounts.push(incomingAccounts);
    res.json(accounts);
})

// GET user by id
route.get('/accounts/:id', (req, res)=>{
    const accountId = Number(req.params.id)
    const getAccount = accounts.find((account) => account.id === accountId)

    if(!getAccount){
        res.status(500).send('Account not found');
    } else{
        res.json({userData:[getAccount]});
    }
})

// PUT user data
route.put('/accounts/:id', (req, res)=>{
    const accountId = Number(req.params.id);
    const body = req.body;
    const account = accounts.find((account)=>account.id === accountId);
    const index = accounts.indexOf(account)
    if(!account){
        res.status(500).send('Account not found');
    } else{
        const updateAccount = {...account, ...body}
        // console.log({...account, ...body})
       account[index] = updateAccount;
        res.send(updateAccount)
    }
}),

// DELETE user data
route.delete('/accounts/:id', (req, res)=>{
    const accountId = Number(req.params.id);
    const newAccounts = accounts.filter((account) => account.id != accountId)

    if(!newAccounts){
        res.status(500).send('Account not found');
    }else{
        accounts = newAccounts;
        res.send(newAccounts)
    }
})



module.exports = route;