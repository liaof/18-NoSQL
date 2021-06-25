const router = require('express').Router();
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza
} = require('../../controllers/pizza-controller');

// /api/pizzas
router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);

// /api/pizzas/:id
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;

// this code
// router.route('/').get(getCallbackFunction).post(postCallbackFunction);
// Use this when we don't have to write route functionality because it's more concise

// is this same as this
// router.get('/', getCallbackFunction);
// router.post('/' postCallbackFunction);
