import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

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
router.post("/add", (req, res) => {
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
    .then(() => res.redirect("/"))
    .catch(error => console.log(error));
});

export default router;
