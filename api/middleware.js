const actionsModel = require("../api/actions/actions-model");
const projectModel = require("./projects/projects-model");

// By ID
function validateActionsId() {
	return async (req, res, next) => {
		try {
			const actions = await actionsModel.get(req.params.id);
			if (actions) {
				req.actionsID = actions;
				next();
			} else {
				res.status(404).json({
					message: "This action ID does not exist.",
				});
			}
		} catch (err) {
			next(err);
		}
	};
}

function validateProjectId() {
	return async (req, res, next) => {
		try {
			const project = await projectModel.get(req.params.id);
			if (project) {
				req.projectsID = project;
				next();
			} else {
				res.status(404).json({
					message: "This project ID does not exist.",
				});
			}
		} catch (err) {
			next(err);
		}
	};
}

//By Body
function validateActionsBody() {
	return async (req, res, next) => {
		const { project_id, description, notes } = req.body;
		try {
			if (!project_id || !description || !notes) {
				res.status(400).json({
					message:
						"Please include an ID, description, and notes when submitting a post.",
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
	validateProjectId,
};
