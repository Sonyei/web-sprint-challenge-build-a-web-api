const actionsModel = require("../api/actions/actions-model");

function validateActionsId() {
	return async (req, res, next) => {
		try {
			const actions = await actionsModel.get(req.params.id);
			if (actions) {
				req.actionsID = actions;
				next();
			} else {
				res.status(404).json({
					message: "This ID does not exist.",
				});
			}
		} catch (err) {
			next(err);
		}
	};
}

module.exports = {
	validateActionsId,
};
