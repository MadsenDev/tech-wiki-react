// routes/categories.js
const express = require('express');
const router = express.Router();
const { sequelize, Category, Guide } = require('../models');

// Get all categories with guide counts
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Category,
          as: 'subcategories',
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM guide_categories AS gc
              WHERE gc.category_id = Category.id
            )`),
            'guideCount',
          ],
        ],
      },
    });

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching categories.' });
  }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Guide, as: 'guides' }] });
    if (category) res.json(category);
    else res.status(404).json({ error: 'Category not found.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the category.' });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the category.' });
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.update(req.body);
      res.json(category);
    } else res.status(404).json({ error: 'Category not found.' });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the category.' });
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.json({ message: 'Category deleted successfully.' });
    } else res.status(404).json({ error: 'Category not found.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the category.' });
  }
});

module.exports = router;