const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    // callback function for GET /api/pizzas route
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({// same as .inclues or join
                path: 'comments',
                select: '-__v'// tell mongoose we don't care about the __v field on comments. note the minus sign to denote 'no'
            })
            .select('-__v')// we don't care about the pizza's __v field either
            .sort({ _id: -1 })// sort in decending order by _id ie. newest pizza first
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one pizza by id
    // note we can not use the 'where: id' clause as a param in getPizzaById, unlike in Sequelize
    getPizzaById({ params }, res) {
        // instead of accessing the entire req, destructure params out of it because it contains all the neccessary data to fufil this request
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                // if no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // createPizza
    createPizza({ body }, res) {// destructure body out of the Express.js req object again
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                res.status(400).json(err);
                console.log('createPizza error');
            });
    },
    // update pizza by id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new:true, runValidators: true })// new:true instructs mongoose to return a new version of the document from the request, instead of the original
            .then(dbPizzaData => {// NEED to explicitly state runValidators: true so we validate the data upon update
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                  }
                  res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;