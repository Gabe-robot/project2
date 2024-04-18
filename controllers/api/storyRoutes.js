const router = require('express').Router();
const {Story} = require('../../models');

// route to create/add a dish
router.post('/', async (req, res) => {
  console.log("I'm Michael")
  console.log(req.body)

  try {
    const storyData = await Story.create({
      story_name: req.body.story_name,
      user_story: req.body.user_story,
      user_id: req.body.user_id,
   
    });
    res.status(200).json(storyData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// According to MVC, what is the role of this action method?
// This action method is the Controller. It accepts input and sends data to the Model and the View.
router.put('/:id', async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
  try {
    const story = await Story.update(
      {
        user_story: req.body.user_story,
        story_name: req.body.story_name,
       
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (story) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(updatedStory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
