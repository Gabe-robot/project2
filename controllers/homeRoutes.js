const router = require('express').Router();
const { Story, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Fetch all stories from the database added attributes so i could specifically target the story
    const stories = await Story.findAll({
      attributes:['user_story']
    });

    // If no stories are found, return a 404 Not Found response
    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: 'No stories found' });
    }

    // Return the retrieved stories as JSON response
    res.status(200).json(stories);
  } catch (err) {
    // Handle any errors and return a 500 Internal Server Error response
    console.error('Error fetching stories:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

    // Serialize data so the template can read it
    const stories = storyData.map((story) => story.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      stories, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/story/:id', async (req, res) => {
  try {
    // Fetch all stories from the database
    const stories = await Story.findAll();

    // If no stories are found, return a 404 Not Found response
    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: 'No stories found' });
    }

    // Return the retrieved stories as JSON response
    res.status(200).json(stories);
  } catch (err) {
    // Handle any errors and return a 500 Internal Server Error response
    console.error('Error fetching stories:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

module.exports = router;

// Use withAuth middleware to prevent access to route
router.get('/storyadd', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Story }],
    });

    const user = userData.get({ plain: true });

    res.render('storyadd', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/storyadd');
    return;
  }

  res.render('login');
});

module.exports = router;
