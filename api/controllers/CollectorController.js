/**
 * CollectorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /** @description :: This function assign Matches to specific collectors
   * (match_id in params) & (collector_id in body) and save a record
   *  of the assignment in the matchescollector table
   */
  AssignMatches: async (req, res) => {
    //we first get the assignments of the collector to check if
    //he/she are assigned 2 matches.
    if (req.params.team) {
      sails.models.matchescollector
        .find()
        .where({
          collector_id: req.body.collector_id,
        })
        .exec(async (err, assignments) => {
          if (err) {
            res.status(400).json({
              error: err,
              message: err.message,
            });
          }
          //if the collector has matches less than 2 then
          //we can assign them a match
          if (assignments.length < 2) {
            sails.models.matchescollector
              .create({
                collector_id: req.body.collector_id,
                match_id: req.params.team,
              })
              .exec((err, new_assignments) => {
                if (err) {
                  res.status(400).json({
                    error: err,
                    message: err.message,
                  });
                }
                res.status(200).json({
                  message: "Collector is now assigned the match",
                  assignments: new_assignments,
                });
              });
          } else {
            res.status(403).json({
              message: "This collector is busy",
            });
          }
        });
    }
  },
};
