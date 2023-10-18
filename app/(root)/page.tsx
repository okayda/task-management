"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import ScrollContainer from "react-indiana-drag-scroll";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppDispatch, useAppSelector } from "@/redux/provider/store";
import { getData, sendData } from "@/redux/actions/fetch-action";

import SideNav from "@/components/SideNav/SideNav";
import AddTask from "@/components/Forms/AddTask/AddTask";
import EditTask from "@/components/Forms/EditTask/EditTask";
import AddColumnBoard from "@/components/Forms/AddColumn/AddColumn";
import AddBoardDrag from "@/components/Forms/AddBoardDrag/AddBoardDrag";
import EditBoard from "@/components/Forms/EditBoard/EditBoard";
import Drag from "@/components/Drag/Drag";
import TaskItem from "@/components/Modals/TaskItem/TaskItem";

let initialExecute = true;

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  // true = Dark theme, false = Light theme ( obj.isDarkTheme = false )
  const theme = useAppSelector((state) => state.kanbanReducer.data.isDarkTheme);
  const currentTheme = !theme ? "light" : "dark";

  const kanbanData = useAppSelector((state) => state.kanbanReducer.data);

  const {
    showAddTask,
    showEditTask,
    showAddColumn,
    showAddBoardDrag,
    showEditBoard,
    showTaskItem,
  } = useAppSelector((state) => state.displayReducer.data);

  useEffect(() => {
    if (initialExecute) {
      // retrieved if there is any existed data otherwise the default data will be applied to the redux store
      dispatch(getData());
      initialExecute = false;

      // preventing to send the initial state to the localStorage
      return;
    }

    dispatch(sendData(kanbanData));
  }, [kanbanData]);

  const props = {
    data: kanbanData,
    dispatch: dispatch,
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className={`main-container ${currentTheme}`}>
        <AnimatePresence>
          {/* Form */}
          {showAddTask && <AddTask {...props} />}

          {/* Form */}
          {showAddColumn && <AddColumnBoard {...props} />}

          {/* Form */}
          {showAddBoardDrag && <AddBoardDrag {...props} />}

          {/* Form */}
          {showEditBoard && <EditBoard {...props} />}

          {/* Modal */}
          {showTaskItem.display && (
            <TaskItem {...props} targetTaskId={showTaskItem.targetTaskId} />
          )}

          {/* Form */}
          {showEditTask.display && (
            <EditTask {...props} targetTaskId={showEditTask.targetTaskId} />
          )}
        </AnimatePresence>

        <ScrollContainer
          className="container"
          vertical={false}
          hideScrollbars={false}
          ignoreElements={".card-item"}
        >
          <SideNav {...props} />

          <Drag {...props} />
        </ScrollContainer>
      </div>
    </>
  );
}
