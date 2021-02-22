// Write your "actions" router here!
const express = require("express");
const actions = require("./actions-model");
const router = express.Router();
const { validateActionsId, validateActionsBody } = require("../middleware");

//Call anything available.
router.get("/", async (req, res, next) => {
	try {
		const fetched = await actions.get();
		res.status(200).json(fetched);
	} catch (err) {
		next(err);
	}
});

//Ensuring ID exists before call.
router.get("/:id", validateActionsId(), async (req, res) => {
	res.status(200).json(req.actionsID);
});

//Ensuring post body is properly structured and exists before call.
router.post("/", validateActionsBody(), async (req, res, next) => {
	try {
		// console.log(req);
		const posted = await actions.insert(req.body);
		res.status(201).json(posted);
	} catch (err) {
		next(err);
	}
});

//Ensuring ID exists at all, and then checking body before call.
router.put(
	"/:id",
	validateActionsId(),
	validateActionsBody(),
	async (req, res, next) => {
		try {
			const updated = await actions.update(req.params.id, req.body);

			res.json(updated);
		} catch (err) {
			next(err);
		}
	}
);

//Destroying everything you love.
router.delete("/:id", validateActionsId(), async (req, res, next) => {
	try {
		await actions.remove(req.params.id);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

// get,
// insert,
// update,
// remove,

module.exports = router;
