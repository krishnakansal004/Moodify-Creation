const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "URL is req"],
  },
  posterUrl: {
    type: String,
    required: [true, "PosterURL is req"],
  },
  title: {
    type: String,
    required: [true, "Title is req"],
  },
  mood:{
    type:String,
    enum:{
        values:["smiling","surprised","sad","neutral"],
        message:"Enum this is"
    }
  }
});

const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;
