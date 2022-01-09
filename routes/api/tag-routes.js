const router = require('express').Router();
const res = require('express/lib/response');
const { rest } = require("lodash");
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, ProductTag }],
    });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(tagData);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, ProductTag }],
    });
    if(!tagData) {
      res.status(404).json({ message:"No tag with that ID."});
      return;
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if(!tagData) {
      res.status(404).json({ message: "No tag with that ID."});
      return;
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!tagData) {
      res.status(404).json({ message: "No tag found with this ID!" });
      return;
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
