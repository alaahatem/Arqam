/**
 * MatchesCollector.js
 *
 * @description :: A model definition represents a match assignments
 
 */
//
module.exports = {
  attributes: {
    match_id: {
      model: "match",
      unique: true,
    },
    collector_id: {
      model: "collector",
    },
  },
};
