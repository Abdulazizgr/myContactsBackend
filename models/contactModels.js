import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add user id"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add contact name"],
    },

    email: {
      type: String,
      required: [true, "Please add contact email"],
    },
    phone: {
      type: String,
      required: [true, "Please add contact phone"],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
