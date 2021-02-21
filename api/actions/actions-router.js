// Write your "actions" router here!

const express = require("express");
const { validateActionsId } = require("../middleware");
const actions = require("./actions-model");
const router = express.Router();

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

// get,
// insert,
// update,
// remove,

module.exports = router;
