require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3001
const db = require("./config/database")

app.use(cors())
app.use(express.json())

app.get("/servicos", async (req,res) =>{
    try {
        const [servicos] = await db.query(
            "SELECT * FROM servicos"
        ) 
        res.json(servicos)
    } catch (error) {
        console.log(error)
    }
})

app.post("/servicos", async (req,res) =>{
    try {
        const {nome, valor} = req.body;

        const sql = `
            INSERT INTO servicos(nome, valor) 
            VALUES(?,?)        
        `

        const [result] = await db.execute(sql,[
            nome,
            valor
        ]);

        res.status(201).json({
            mensagem:"Serviço cadastrado com sucesso",
            cafe: {
                id: result.insertId,
                nome, 
                valor
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensagem: "Erro ao cadastrar serviço"
        })
    }
});

app.listen(PORT, () =>{
    console.log("Servidor rodando na porta 3001!")
})