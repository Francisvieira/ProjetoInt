//******************Backend 

const mysql = require("mysql");
const express = require("express");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

//***************Banco de dados ****************
const interacao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bdprodutos"
})
interacao.connect((erro) => {
    if (erro) {
        console.error("erro ao tentar estabelecer a conexao" + erro.stack);
        return;
    }
    console.log("conectado ao banco de dados ->" + interacao.threadId);
})


app.get("/produtos/listar", (req, res) => {
    //consulta sql para selecionar os produtos no DB
    interacao.query("select * from tbproduto", (erro, resultado) => {
        if (erro) {
            return res.status(500).send({ output: "erro ao tentar executar a consulta" + erro });
        }
        res.status(200).send({ output: resultado });
    });

});

//**********************buscar o produto

app.get("/produto/buscar/:id", (req, res) => {
    interacao.query("select * from tbproduto where idproduto=?", [req.params.id], (erro, resultado) => {
        if (erro) {
            return res.status(500).send({ output: `Erro ao tentar executar a consulta ${erro}` });
        }
        if (resultado == null || resultado == "") {
            return res.status(404).send({ output: `Não foi possivel localizar esse produto` });

        }
        res.status(200).send({ output: resultado });
    });
})

app.post("/produto/cadastro", (req, res) => {
    interacao.query("insert into tbproduto set ?", [req.body], (erro, resultado) => {
        if (erro) {
            res.status(500).send({ output: `Não foi possivel cadastrar -> ${erro}` });
            return;
        }
        res.status(201).send({ output: resultado });
    });
});

app.put("/produto/atualizar/:id", (req, res) => {
    console.log(req)
    interacao.query("update tbproduto set ? where idproduto=?", [req.body, req.params.id], (erro, resultado) => {
        if (erro) {
            res.status(500).send({ output: `Erro ao tentar atualizar os dados -> ${erro}` });
            return;
        }
        res.status(200).send({ output: resultado });
    });

});


//***************** * Deletar*************************
app.delete("/produto/apagar/:id", (req, res) => {
    interacao.query("delete from tbproduto where idproduto =?", [req.params.id], (erro, resultado) => {
        if (erro) {
            res.status(500).send({ output: `Erro ao tenatar apagar o produto ->${erro}` });
            return;
        }
        res.status(204).send({ output: resultado });
    });
});

// subir o servidor na porta 3000 
app.listen("3000", () => console.log("Servidor online em: http://localhost:3000"));

module.exports = app;