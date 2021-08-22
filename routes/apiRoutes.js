const router = require('express').Router();
const Workout = require('../models/workout.js');

// gets all workouts
router.get("/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    },
    {
      $sort: {
        'day': 1
      }
    }
  ])
  .then((workoutdocs) => {
    res.json(workoutdocs);
  })
  .catch((err) => {
    res.json(err);
  });
});

// creates a new workout
router.post("/workouts", (req, res) => {
  Workout.create(req.body)
  .then((workoutdocs) => {
    res.json(workoutdocs);
  })
  .catch((err) => {
    res.json(err);
  });
});

// updates a workout with an added exercise and return the new doc
router.put("/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true }
  )
  .then((workoutdocs) => {
    res.json(workoutdocs);
  })
  .catch((err) => {
    res.json(err);
  });
});

// gets all workouts in 7-day range for api function getWorkoutsInRange
router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    },
    {
      $sort: {
        'day': -1
      }
    },
    {
      $limit: 7
    }
  ])
  .then((workoutdocs) => {
    res.json(workoutdocs);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;