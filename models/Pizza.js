const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,//requires pizzaName to exist
      trim: true// same as trim(), removing white space before and after the first and last char
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)// take the createdAt's value and dateFormat it
    },
    size: {
      type: String,
      required: true,
      // the enum option stands for enumerable, which refers to a set of data that can be iterated over, like using for...in to iterate through an object
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],// if the user tries to enter a pizza size not listed, like UberBig, the validation won't allow  it
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'// very important, tells the Pizza model which document to search to find the right comments
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true// tell mongoose to use any getter functions specified
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});
// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
