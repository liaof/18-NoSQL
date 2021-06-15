 const { Comment, Pizza } = require('../models');

 const commentController = {
    // add comment to pizza

    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
          .then(({ _id }) => {// _id being the id of the comment just created
            return Pizza.findOneAndUpdate(// return this promise so we can do something with the results
              { _id: params.pizzaId },// where: {_id : params.pizzaId}. e _id = pizza._id
              { $push: { comments: _id } },// add comment._id to the pizza.comments array = comment._id
              { new: true }// receive back the new updated pizza, with the new comment included
            );
          })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
    },
    //remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
          .then(deletedComment => {
            if (!deletedComment) {
              return res.status(404).json({ message: 'No comment with this id!' });
            }
            return Pizza.findOneAndUpdate(// use Comment _id to remove it from the pizza
              { _id: params.pizzaId }, { $pull: { comments: params.commentId } }, { new: true }
            );// return updated pizza data, now without the _id of the removed comment in the pizza.comments array
          })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
    }
 };

 module.exports = commentController;