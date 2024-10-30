const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  name: { 
    type: String, 
    required: true 
},
  startTime: { 
    type: Date, 
    required: true 
},
  endTime: { 
    type: Date, 
    required: true 
},
  players: [
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Player" 
    }
],
  status: {
    type: String,
    enum: ["pending", "active", "ended"],
    default: "pending",
  },
},{
    timestamps:true
});

module.exports = mongoose.model("Session", sessionSchema);
