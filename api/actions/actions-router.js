// Write your "actions" router here!

const express = require("express");
const actions = require("./actions-model");
const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const fetch = await actions.get();
		res.status(200).json(fetch);
	} catch (err) {
		next(err);
	}
});

// get,
// insert,
// update,
// remove,

module.exports = router;
