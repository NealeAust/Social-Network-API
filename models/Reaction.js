const { Schema } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
   reactionId: {
      type: Schema.Types.ObjectId.id,
      default: () => Types.ObjectId()
   },
   reactionBody: {
      type: String,
      required: true,
      maxLength: 280
   },
username: {
type: String,
required: true
},
createdAt: {
type: Date,
default: Date.now,
get: createdAtVal => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')
},

toJSON: {
getters: true
},
id: false
});


module.exports = reactionSchema;
 



