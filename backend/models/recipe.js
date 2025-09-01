const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const recipeSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    instruction: {
      type: String,
    },
    image_reference: {
      type: [String], // cointains the path to the image
    },
    author: {
      type: String,
      required: true,
    },
    youtube_reference: {
      // possible feature to put an i frame to show be able to play the video from whe website
      type: String,
    },
  },
  { timeseries: true } // schema option < createdAt, updatedAt >
);

module.exports = mongoose.model("recipe", recipeSchema);
