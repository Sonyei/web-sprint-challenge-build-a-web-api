// Write your "projects" router here!
const express = require("express");
const projects = require("./projects-model");
const router = express.Router();
const { validateProjectId, validateProjectBody } = require("../middleware");

//Call anything available.
router.get("/", async (req, res, next) => {
	try {
		const fetched = await projects.get();
		res.status(200).json(fetched);
	} catch (err) {
		next(err);
	}
});

//Ensuring ID exists before call.
router.get("/:id", validateProjectId(), async (req, res) => {
	res.status(200).json(req.projectsID);
});

//Returns the array of actions from a project object.
router.get("/:id/actions", validateProjectId(), (req, res) => {
	// console.log(req.projectsID);
	res.status(200).json(req.projectsID.actions);
});

//Ensuring post body is properly structured and exists before call.
router.post("/", validateProjectBody(), async (req, res, next) => {
	try {
		const posted = await projects.insert(req.body);
		res.status(201).json(posted);
	} catch (err) {
		next(err);
	}
});

//Ensuring ID exists at all, and then checking body before call. Autoformatting is Satan.
router.put(
	"/:id",
	validateProjectId(),
	validateProjectBody(),
	async (req, res, next) => {
		try {
			const updated = await projects.update(req.params.id, req.body);
			res.json(updated);
		} catch (err) {
			next(err);
		}
	}
);

//Destroying everything you love.
router.delete("/:id", validateProjectId(), async (req, res, next) => {
	try {
		await projects.remove(req.params.id);
		res.status(204).end();
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
