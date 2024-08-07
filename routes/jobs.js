import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("Ok!")
})

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
