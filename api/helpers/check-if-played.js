module.exports = {
  friendlyName: "Check if played",

  description: "",

  inputs: {
    req: {
      type: "ref",
      friendlyName: "Request",
      description: "A reference to the request object (req).",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs, exits) {
    req = inputs.req;
    var match_id = req.params.id;
    await sails.models.match
      .findOne()
      .where({
        id: match_id,
      })
      .exec((err, result) => {
        if (err) {
          res.status(404).json({
            err: error,
            message: err.message,
          });
        }
        //get kickoff time
        var kickoff = result.kickoff_time.split(":");
        var hour = Number(kickoff[0].trim());
        var min = Number(kickoff[1].trim());
        var sec = Number(kickoff[2].trim());
        //get matchday date
        var current_date = new Date();
        var date = result.date.split("-");
        var year = Number(date[0].trim());
        var month = Number(date[1].trim());
        var day = Number(date[2].trim());
        //edit month as it enumerates from 0
        matchDate = new Date(year, month - 1, day, hour, min, sec);
        //check if current date& time is greater or equal which means
        // we passed the match kickoff and match is Played and we return true
        //otherwise we return false
        if (current_date >= matchDate) {
          return exits.success(true);
        } else {
          return exits.success(false);
        }
      });
  },
};
