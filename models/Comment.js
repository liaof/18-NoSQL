const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      replyId: {
        type: Schema.Types.ObjectId,// generates same type of value the _id field typically does
        default: () => new Types.ObjectId()
      },
      replyBody: {
        type: String
      },
      writtenBy: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true// use toJSON to add getters (get: createdAtVal => dateFormat(createdAtVal)) to all timestamp-related fields
      }
    }
);

const CommentSchema = new Schema(
    {
      writtenBy: {
        type: String
      },
      commentBody: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      replies: [ReplySchema]// populates replies field with an array of data that adheres to the ReplySchema definition
    },
    {
      toJSON: {
        virtuals: true,// add virtual to get total reply count
        getters: true
      },
      id: false
    }
);

// we don't store the replyCount in the database itself, so we use a virtual to calculate the replyCount when comment is retrieved, on the fly
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;