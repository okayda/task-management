import mongoose from "mongoose";

const kanbanSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: String,
  sideNavList: [
    {
      title: String,
      columns: {
        todo: [
          {
            id: String,
            title: String,
            description: String,
            subItems: [{ item: String, isComplete: Boolean }],
          },
        ],
        doing: [],
        done: [],
      },
    },
  ],
});

const Kanban = mongoose.models.Kanban || mongoose.model("Kanban", kanbanSchema);

export default Kanban;
