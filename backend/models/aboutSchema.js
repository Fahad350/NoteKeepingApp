import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    requiured: true,
  },
  email: {
    type: String,
    requiured: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const aboutUs = mongoose.model("aboutUs", aboutSchema);
export default aboutUs;
