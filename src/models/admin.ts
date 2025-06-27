// models/User.ts
import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String, // only if you're using credentials
  role: { type: String, default: "admin" }, // can be 'admin' or 'user'
})

export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema)
