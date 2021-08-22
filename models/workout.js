const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create schema for a workout plan
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      name : {
        type : String,
        trim: true,
        required : "Name this exercise"
      },
      type : {
        type: String,
        required : "Enter type of exercise"
      },
      weight: {
        type: Number
      },
      sets: {
        type : Number
      },
      reps: {
        type : Number
      },
      duration : {
        type : Number,
        required : "Enter duration of exercise in minutes"
      },
      distance : {
        type : Number
      }
    }
  ]
});


// Create mongoose model 'workout' and apply workout schema to that model
const Workout = mongoose.model("Workout", workoutSchema);

// Export workout model
module.exports = Workout;