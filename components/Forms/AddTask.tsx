import { WrappedOverlay } from "../OverlayType/OverlayType";
import { toggleNav } from "@/redux/features/display-slice";
import { AppDispatch } from "@/redux/store";

export default function AddTask({ dispatch }: { dispatch: AppDispatch }) {
  const closeNav = function (): void {
    dispatch(toggleNav({ showNav: false }));
  };

  return (
    <WrappedOverlay onClose={closeNav}>
      <div>
        <h3>Add New Task</h3>

        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" rows={4}></textarea>
          </div>

          <div>
            <label htmlFor="subtask">Subtasks</label>
            <input type="text" id="subtask" />
            <button>Add New Subtask</button>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </WrappedOverlay>
  );
}
