const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    admin_role: {
      type: Number,
      required: true,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
