/**
 * MatchController
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
    // we check if the match is played
    var isPlayed = await sails.helpers.checkIfPlayed(req);
    if (isPlayed) {
      //we first get the assignments of the collector to check if
      //he/she are assigned 2 matches.
      if (req.params.id) {
        sails.models.matchescollector
          .find()
          .where({
            collector_id: req.body.collector_id,
          })
          .exec(async (err, assignments) => {
            if (err) {
              res.status(400).json({
                message: err.message,
              });
            }
            //if the collector has matches less than 2 then
            //we can assign them a match
            if (assignments.length < 2) {
              sails.models.matchescollector
                .create({
                  collector_id: req.body.collector_id,
                  match_id: req.params.id,
                })
                .exec(async (err, new_assignments) => {
                  if (err) {
                    res.status(409).json({
                      message: err.message,
                    });
                  }
                  await sails.models.match
                    .updateOne({ id: req.params.id })
                    .set({
                      status: "Assigned",
                    })
                    .exec((err, result) => {
                      res.status(200).json({
                        message: "Collector is now assigned the match",
                        assignments: new_assignments,
                      });
                    });
                });
            } else {
              res.status(403).json({
                message: "This collector is busy",
              });
            }
          });
      }
    } else {
      res.status(409).json({
        message: "This match is not played yet",
      });
    }
  },
  //GET MATCHES BY TEAM
  //----------------------------------------------------------
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
  // CREATING A NEW MATCH
  addMatch: async (req, res) => {
    //CREATING A new instance of the match
    await sails.models.match
      .create({
        date: req.body.date,
        home_team_id: req.body.home_team_id,
        away_team_id: req.body.away_team_id,
        stadium_id: req.body.stadium_id,
        referee_id: req.body.referee_id,
        competition_id: req.body.competition_id,
        kickoff_time: req.body.kickoff_time,
      })
      .fetch()
      .exec((err, newMatch) => {
        if (err) {
          res.status(400).json({
            message: err.message,
          });
        }
        // we can't have opponents of the same team logically
        if (req.body.home_team_id == req.body.away_team_id) {
          res.status(409).json({
            message:
              "You can not create a match where opponents are the same team",
          });
        }
        res.status(200).json({
          newMatch,
        });
      });
  },
};
