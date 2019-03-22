const mongoose = require("mongoose");

const politicianSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: [true, "First name cannot be empty!"],
      trim: true
    },
    last: {
      type: String,
      required: [true, "Last name cannot be empty!"],
      trim: true
    }
  },
  office: {
    type: String,
    required: [true, "the politician office cannot be empty!"]
  },
  image: {
    type: String,
    required: [true, "the politician image cannot be empty!"]
  },
  tenure: {
    start: {
      type: Date,
      required: [true, "the politician start date cannot be empty"]
    },
    end: {
      type: Date,
      required: [true, "the politician start date cannot be empty"]
    }
  },
  description: {
    type: String,
    required: [true, "a description about the politician cannot be empty!"]
  }
});

const promisesSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "a description about the promise cannot be empty!"]
  },
  media: {
    type: String,
    required: [true, "the proof of promise cannot be empty!"]
  },
  promise_by: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The id of the creator cannot be empty!"]
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty!"],
      unique: true,
      lowercase: true
    },
    username: {
      type: String,
      required: [true, "Username cannot be empty!"]
    }
  },
  upvote: {
    type: Number,
    trim: true,
    default: 0
  },
  downvote: {
    type: Number,
    trim: true,
    default: 0
  }
});

const feedbackSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "a description about the feedback cannot be empty!"]
  },
  media: {
    type: String,
    required: [true, "the proof of promise cannot be empty!"]
  },
  rating: {
    type: Number,
    required: [true, "the rating cannot be empty!"]
  },
  feedback_by: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The id of the creator cannot be empty!"]
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty!"],
      unique: true,
      lowercase: true
    },
    username: {
      type: String,
      required: [true, "Username cannot be empty!"]
    }
  },
  promise_linked: {
    description: String,
    media: String,
    promise_by: {
      _id: mongoose.Schema.Types.ObjectId,
      email: String,
      username: String
    }
  },
  upvote: {
    type: Number,
    trim: true,
    default: 0
  },
  downvote: {
    type: Number,
    trim: true,
    default: 0
  }
});

const platformSchema = new mongoose.Schema({
  politician: [politicianSchema],
  feedback: [feedbackSchema],
  promise: [promisesSchema]
});

mongoose.model("Platform", platformSchema);
