/**
 * CollectorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Set the status of the match as collected
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
  //get Assignments of a specific collector
  getAssignmentsByCollector: async (req, res) => {
    if (req.params.id) {
      await sails.models.matchescollector
        .find()
        .where({
          collector_id: req.params.id,
        })
        // and populate the match info with it
        .populate("match_id")
        .exec((err, assignments) => {
          if (err) {
            res.status(400).json({
              error: err,
              message: err.message,
            });
          }
          //if there's matches assigned to this collector we return them
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
