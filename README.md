### Learning Goals
- Integrate the API code with the client’s existing codebase.
- Create a Pizza model using Mongoose.
- Use Mongoose’s middleware to automate functionality.
- Implement Mongoose’s pre-built methods for CRUD operations.
- Complete a working front end to create a new pizza.

- Create a Mongoose model.
- Set up CRUD methods that use Mongoose models.
- Create a relationship between two models.
- Interact with arrays in Mongoose.
- Work with subdocuments in Mongoose.
- Implement getters with Mongoose.

MERN stack - MERN stands for MongoDB, Express.js, React, and Node.js

const dogObject = {
--// this...
--bark: function() {
----console.log('Woof!');
--},

--// ... is the same as this
--bark() {
----console.log('Woof!');
--}
}

// this code
router.route('/').get(getCallbackFunction).post(postCallbackFunction);

// is this same as this
router.get('/', getCallbackFunction);
router.post('/' postCallbackFunction);


- .findOneAndUpdate() - find a single document, updates it, and returns. Set 3rd param as { new: true } to return a new document instead of the original
- .updateOne(), .updateMany() - updates documents without returning them
- .insertOne(), .insertMany() - MongoDB methods for adding data to a collection/database
- .create() - Mongoose method for both single and multiple data inserts
- .deleteOne() .deleteMany() - deletes data from collection/database
- .findOneAndDelete() - returns the document to be deleted before deleting it
- MongoDB-based functions start with $
- getter - typically a special type of function that takes the stored data you are looking to retrieve and modifies or formats it upon return. Think of it like middleware for your data!
### Tools Used

- MongoDB Don't need to recreate database to enforce new associations unlike w/ SQL
- Mongoose (virtuals)
- Express.js
- 