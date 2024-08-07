import express from "express";
import database from './db/connection.js';
import bodyParser from "body-parser";
import router from "./routes/jobs.js";

const PORT = 3000;
const app = express();

app.listen(PORT, function () {
    console.log(`Express rodando na porta: ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// db connection
database
    .authenticate()
    .then(() =>{
        console.log("Conexão com o bando de dados estabelecida com sucesso!")
    })
    .catch(Error => {
        console("Não foi possível estabelecer a conexão com o banco de dados", Error)
    });

// routes
app.get("/", (req, res) => {
    res.send("Serviços Up!")
});
 
// jobs routes
app.use("/jobs", router);
