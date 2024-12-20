const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId, //one who subscribing
      ref: "User",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId, //one to whom "Subscriber" is Subscribing
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
