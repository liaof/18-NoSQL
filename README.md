### Learning Goals
- Integrate the API code with the client’s existing codebase.</br>
- Create a Pizza model using Mongoose.</br>
- Use Mongoose’s middleware to automate functionality.</br>
- Implement Mongoose’s pre-built methods for CRUD operations.</br>
- Complete a working front end to create a new pizza.</br>

- Create a Mongoose model.</br>
- Set up CRUD methods that use Mongoose models.</br>
- Create a relationship between two models.</br>
- Interact with arrays in Mongoose.</br>
- Work with subdocuments in Mongoose.</br>
- Implement getters with Mongoose.</br>

- Enable users to view a single pizza’s discussion.
- Create subdocuments in Mongoose.
- Create custom id models in Mongoose.
- Create virtuals to extend the functionality of the models.
- MERN stack - MERN stands for MongoDB, Express.js, React, and Node.js

- Add IndexedDB functionality to locally save the created pizzas whenever the app is offline.

- Add validation to the Pizza model.
- Add validation to the Comment model and Reply schema.
- Deploy the application to Heroku.
<!-- ******************************************************************************************************************* -->
const dogObject = {
--// this...
--bark: function() {
----console.log( 'Woof!' );
--},

--// ... is the same as this
--bark() {
----console.log( 'Woof!' );
--}
}
<!-- ******************************************************************************************************************* -->
// this code
router.route('/').get( getCallbackFunction ).post( postCallbackFunction );

// is this same as this</br>
router.get( '/', getCallbackFunction );</br>
router.post( '/' postCallbackFunction );</br>
<!-- ******************************************************************************************************************* -->

- .findOneAndUpdate() - find a single document, updates it, and returns. Set 3rd param as { new: true } to return a new document instead of the original</br>

- .updateOne(), .updateMany() - updates documents without returning them</br>

- .insertOne(), .insertMany() - MongoDB methods for adding data to a collection/database</br>

- .create() - Mongoose method for both single and multiple data inserts</br>

- .deleteOne() .deleteMany() - deletes data from collection/database</br>

- .findOneAndDelete() - returns the document to be deleted before deleting it</br>

- .reduce() As reduce goes through each element of the array, it passes the current elements' value and # of elements</br>

- .open() - params are the name of the database you'd like to connect to, or create if it doesn't exist, and version of the 
            database (used to check if the database's structure changed between connections). 
            ex; IndexedDB.open( 'myIDB', 1 ) creates/connects to the IndexedDB by the name of myIDB

- MongoDB-based functions start with $</br>

- getter - typically a special type of function that takes the stored data you are looking to retrieve and modifies or formats it upon return.</br> 
           Think of it likemiddlewarefor your data!</br>

- virtuals - allows a method to access a field that doesn't actually exist in the database by creating a virtual field that can be evaluated when the documents are </br>     
             retrieved from the database (like total_upvotes or reply_count that isn't stored in the database but calculated when the upvote and reply fields are shown)</br>

- enumerable -

- transaction - temporary connection. <!---->need to read up more on this<!---->

- collection - the container that MongoDB uses to store the data, same as an SQL table

- object store - the container that IndexedDB uses to store the data, same as an SQL table

<!-- ******************************************************************************************************************* -->
### Tools Used

- MongoDB Don't need to recreate database to enforce new associations unlike w/ SQL
- Mongoose (virtuals)
- Express.js
- IndexedDB


</br>

<!-- ******************************************************************************************************************* -->
back End PUT( controllers/) 

    addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body } },// push body to the replies array
            { new: true }
        )
        .then( dbPizzaData => {
            if ( !dbPizzaData ) {
              res.status( 404 ).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json( dbPizzaData );
          })
          .catch( err => res.json( err ));
}
<!-- ******************************************************************************************************************* -->
front End PUT( public/js/ )

fetch( `/api/comments/${ pizzaId }/${ commentId }`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( formData )
  })
    .then( response => {
      if ( !response.ok ) {
        throw new Error( 'Something went wrong!' );
      }
      response.json();
    })
    .then( commentResponse => {
      console.log( commentResponse );
      location.reload();
    })
    .catch( err => {
      console.log( err );
    });
<!-- ******************************************************************************************************************* -->