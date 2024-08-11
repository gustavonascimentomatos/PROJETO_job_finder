import express from "express";
import { create } from "express-handlebars"; // Importa o construtor do handlebars
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
import database from './db/connection.js';
import bodyParser from "body-parser";
import router from "./routes/jobs.js";

// Criação de __dirname para uso em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const app = express();

app.listen(PORT, function () {
    console.log(`Express rodando na porta: ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// handle bars
app.set("views", path.join(__dirname, "views"));
const exphbs = create({ defaultLayout: "main" });
app.engine("handlebars", exphbs.engine);
app.set("view engine", "handlebars");

// static folder
app.use(express.static(path.join(__dirname, "public")))

// db connection
database
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso!")
    })
    .catch(Error => {
        console.log("Não foi possível estabelecer a conexão com o banco de dados", Error)
    });

// routes
app.get("/", (req, res) => {
    res.render("index")
});

// jobs routes
app.use("/jobs", router);
