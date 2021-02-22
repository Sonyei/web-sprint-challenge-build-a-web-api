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

function validateActionsBody() {
	return async (req, res, next) => {
		const { project_id, description, notes } = req.body;
		try {
			if (!project_id || !description || !notes) {
				res.status(400).json({
					message:
						"Please include an ID, a description, and notes when submitting a post.",
				});
			} else {
				// req.actionsBody = ????????
				next();
			}
		} catch (err) {
			next(err);
		}
	};
}

module.exports = {
	validateActionsId,
	validateActionsBody,
};
