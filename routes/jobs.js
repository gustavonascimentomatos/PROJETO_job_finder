import express from "express";
import Job from "../models/Job.js";
import multer from "multer";
import path from "path";

const router = express.Router();
let contadorId = 0;

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/logo/");
    },
    filename: function(req, file, cb) {
        cb(null, contadorId+1 + path.extname(file.originalname));
    }
});

const upload = multer({storage});

// detalhe da vaga
router.get("/view/:id", (req, res) => Job.findOne({
    where: {id: req.params.id}
    }).then(job => {
        res.render("view", {
            job
        });
    }).catch(Error => console.log(Error))
);

// form da rota de envio
router.get("/add", (req, res) => {
    res.render("add");
});

// Add job via POST
router.post("/add", upload.single("file"), (req, res) => {
    let {title, description, salary, company, email, new_job} = req.body;

    // Insert into database
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job,
    })
    .then(() => res.redirect("/"), contadorId++)
    .catch(error => console.log(error));
});

export default router;
