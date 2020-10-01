module.exports = {
  friendlyName: "Check collector",

  description: "",

  inputs: {
    collector_id: {
      type: "number",
      friendlyName: "collector",
      description: "A reference to the collector's id.",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs, exits) {
    await sails.models.collector
      .findOne({
        id: inputs.collector_id,
      })
      .exec((err, collector) => {
        if (err) {
          res.status(400).json({
            err: err.message,
          });
        }
        console.log(collector);
        if (collector.busy) {
          return exits.success(true);
        } else return exits.success(false);
      });
  },
};
