// Write your "actions" router here!
const express = require("express");
const actions = require("./actions-model");
const router = express.Router();
const { validateActionsId, validateActionsBody } = require("../middleware");

router.get("/", async (req, res, next) => {
	try {
		const fetched = await actions.get();
		res.status(200).json(fetched);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", validateActionsId(), async (req, res) => {
	res.status(200).json(req.actionsID);
});

router.post("/", validateActionsBody(), async (req, res, next) => {
	try {
		// console.log(req);
		const posted = await actions.insert(req.body);
		res.status(201).json(posted);
	} catch (err) {
		next(err);
	}
});

router.put(
	"/:id",
	validateActionsId(),
	validateActionsBody(),
	async (req, res, next) => {
		try {
			const updated = await actions.update(req.params.id, req.body);
			res.status(204).json(updated);
		} catch (err) {
			next(err);
		}
	}
);

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
