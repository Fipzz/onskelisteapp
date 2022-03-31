import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
});

const SessionModel = mongoose.model("session", sessionSchema);

module.exports = SessionModel;
