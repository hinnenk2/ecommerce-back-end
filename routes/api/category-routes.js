const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {     //get requests obtain data/information
  try {
    // find all categories
    const catData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(catData);  //200 is successful code
  } catch (err) {
    res.status(500).json(err);           //500 is standard error code for misconnection
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {    //findByPk obtains a single key based on the entered primary key.
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {          //post request adds data to our db
  // create a new category
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);                //error 400 occurs if incorrect content was sent in the request 
  }
});

router.put('/:id', async (req, res) => {      //put request updates data in our db
  // update a category by its `id` value
  try {
    const categoryId = await Category.update(
      {
        category_name: req.body.category_name,  //category can be updated based on the input id.
      },
      {
        where: {
          id: req.params.id,   //acquire the category based on the provided id.
        },
      }
    );
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(404).json({ message: 'Invalid id' });  //error 404 responds if the endpoint does not exist
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({        //destroy=delete
      where: {
        id: req.params.id,
      },
    });

    if (!catData) {
      res.status(404).json({ message: 'Invalid id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
