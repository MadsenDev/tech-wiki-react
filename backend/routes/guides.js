// routes/guides.js
const express = require('express');
const router = express.Router();
const { Guide, Category, Comment, Rating, GuideCategory, User } = require('../models');
const { Op } = require('sequelize');

// routes/guides.js
router.get('/', async (req, res) => {
  try {
    const {
      search,
      sort = 'title',
      sortOrder = 'ASC',
      categorySlug,
      page = 1,
      limit = 10,
      status, // Add status filter
    } = req.query;

    console.log(status);

    const where = {};
    const include = [
      { 
        model: Category, 
        as: 'categories',
        through: { model: GuideCategory, attributes: [] },
      },
      { model: Comment },
      { model: Rating },
      { model: User, as: 'author', attributes: ['id', 'username', 'firstName', 'lastName'] },
    ];

    // Apply search filter
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }

    // Apply category filter
    if (categorySlug) {
      include[0].where = { slug: categorySlug };
    }

    // Apply status filter
    if (status) {
      where.status = status;
    }

    // Calculate offset based on page and limit
    const offset = (page - 1) * limit;

    const { count, rows: guides } = await Guide.findAndCountAll({
      where,
      include,
      order: [[sort, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      guides,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching guides.' });
  }
});

// Get a guide by slug with author details
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const guide = await Guide.findOne({
      where: { slug },
      include: [
        { model: Category, as: 'categories', through: { model: GuideCategory, attributes: [] } },
        { model: Comment },
        { model: Rating },
        { model: User, as: 'author', attributes: ['id', 'username', 'firstName', 'lastName'] }
      ]
    });

    if (guide) {
      res.json(guide);
    } else {
      res.status(404).json({ error: 'Guide not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the guide.' });
  }
});

// Fetch guides by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, status } = req.query;

    const where = { author_id: userId };

    // Apply status filter
    if (status) {
      where.status = status;
    }

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    const { count, rows: guides } = await Guide.findAndCountAll({
      where,
      include: [
        { model: Category, as: 'categories', through: { model: GuideCategory, attributes: [] } },
        { model: Comment },
        { model: Rating },
        { model: User, as: 'author', attributes: ['id', 'username', 'firstName', 'lastName'] },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      guides,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching guides by user.' });
  }
});

// Get a guide by ID with author details
router.get('/:id', async (req, res) => {
  try {
    const guide = await Guide.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Comment },
        { model: Rating },
        { model: User, as: 'author', attributes: ['id', 'username', 'firstName', 'lastName'] }
      ]
    });

    if (guide) {
      res.json(guide);
    } else {
      res.status(404).json({ error: 'Guide not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the guide.' });
  }
});

// Create a new guide with category associations
router.post('/', async (req, res) => {
  try {
    const { categoryIds, author_id, ...guideData } = req.body;
    const guide = await Guide.create({ ...guideData, author_id });

    // If categoryIds are provided, associate them with the new guide
    if (categoryIds && Array.isArray(categoryIds)) {
      await guide.setCategories(categoryIds); 
    }

    res.status(201).json(guide);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'An error occurred while creating the guide.' });
  }
});

// Update a guide by ID, including category associations
router.put('/:id', async (req, res) => {
  try {
    const { categoryIds, ...guideData } = req.body; // Separate categoryIds from other data
    const guide = await Guide.findByPk(req.params.id);

    if (guide) {
      await guide.update(guideData);

      // Update category associations if provided
      if (categoryIds && Array.isArray(categoryIds)) {
        await guide.setCategories(categoryIds); // Update categories associated with the guide
      }

      res.json(guide);
    } else {
      res.status(404).json({ error: 'Guide not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'An error occurred while updating the guide.' });
  }
});

// Delete a guide by ID
router.delete('/:id', async (req, res) => {
  try {
    const guide = await Guide.findByPk(req.params.id);
    if (guide) {
      await guide.destroy();
      res.json({ message: 'Guide deleted successfully.' });
    } else res.status(404).json({ error: 'Guide not found.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the guide.' });
  }
});

module.exports = router;