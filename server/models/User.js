import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "manager", "staff"], default: "staff" },
});

export default mongoose.model("User", UserSchema);
