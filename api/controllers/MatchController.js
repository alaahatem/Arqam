/**
 * MatchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //This function returns a list
  // of matches that include a specific team
  //using id in params
  getMatchesByTeam: async (req, res) => {
    if (req.params.team) {
      sails.models.match
        .find()
        .where({
          or: [
            {
              home_team_id: req.params.team,
            },
            { away_team_id: req.params.team },
          ],
        })
        .populate("home_team_id")
        .populate("away_team_id")
        .populate("referee_id")
        .populate("stadium_id")
        .exec((err, matches) => {
          if (err) {
            res.status(400).json({
              error: err,
              message: err.message,
            });
          }
          res.status(200).json({
            matches,
          });
        });
    }
  },
};
