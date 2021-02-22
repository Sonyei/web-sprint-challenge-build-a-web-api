// Write your "projects" router here!
const express = require("express");
const projects = require("./projects-model");
const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const fetched = await projects.get();
		res.status(200).json(fetched);
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
