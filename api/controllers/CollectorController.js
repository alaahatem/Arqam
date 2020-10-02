/**
 * CollectorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  collectMatch: async (req, res) => {
    await sails.models.match
      .updateOne()
      .where({
        id: req.params.id,
        status: "Assigned",
      })
      .set({ status: "Collected" })
      .exec((err, AssignedMatches) => {
        if (err) {
          res.status(400).json({
            error: err,
            message: err.message,
          });
        }
        res.status(200).json({
          AssignedMatches,
        });
      });
  },
  getAssignmentsByCollector: async (req, res) => {
    if (req.params.id) {
      await sails.models.matchescollector
        .find()
        .where({
          collector_id: req.params.id,
        })
        .populate("match_id")
        .exec((err, assignments) => {
          if (err) {
            res.status(400).json({
              error: err,
              message: err.message,
            });
          }
          if (assignments.length > 0) {
            res.ok(assignments);
          } else {
            res.status(200).json({
              assignments: assignments,
              message: "This collecter is not assigned any matches",
            });
          }
        });
    }
  },
};
