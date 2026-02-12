import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    branch: String,
    skills: String,
    time: String,
    result: String,
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
