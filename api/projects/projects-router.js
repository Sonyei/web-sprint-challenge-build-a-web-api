// Write your "projects" router here!
const express = require("express");
const projects = require("./projects-model");
const router = express.Router();
const { validateProjectId, validateProjectBody } = require("../middleware");

router.get("/", async (req, res, next) => {
	try {
		const fetched = await projects.get();
		res.status(200).json(fetched);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", validateProjectId(), async (req, res, next) => {
	res.status(200).json(req.projectsID);
});

router.post("/", validateProjectBody(), async (req, res, next) => {
	try {
		const posted = await projects.insert(req.body);
		res.status(201).json(posted);
	} catch (err) {
		next(err);
	}
});

// get,
// insert,
// update,
// remove,
// getProjectActions,

module.exports = router;
