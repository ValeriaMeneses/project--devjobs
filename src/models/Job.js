const { Model } = require('objection');

class Job extends Model {
  static get tableName () {
    return 'job';
  }
  //para relacionar
  // static get relationMappings () {
  //   const nombremodelo = require('./Tweet.js');
  //   return{
  //     tweets : {
  //       relation: Model.HasManyRelation,
  //       modelClass: Tweet,
  //       join:{
  //         from: 'users.id'
  //         to: 'tweets.userId'
  //       }
  //     }
  //   }
  // }
}
module.exports = Job;
