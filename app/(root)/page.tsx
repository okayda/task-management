"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import ScrollContainer from "react-indiana-drag-scroll";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { getData, sendData } from "@/redux/features/kanban-action";

import SideNav from "@/components/SideNav/SideNav";
import AddTask from "@/components/Forms/ItemTask/AddTask";
import AddColumn from "@/components/Forms/AddColumn/AddColumn";
import Drag from "@/components/Drag/Drag";
import TaskItem from "@/components/Modals/TaskItem/TaskItem";

let initialExecute = true;

export default function page() {
  const dispatch = useDispatch<AppDispatch>();

  // true = Dark theme, false = Light theme ( obj.isDarkTheme = false )
  const theme = useAppSelector((state) => state.kanbanReducer.data.isDarkTheme);
  const currentTheme = !theme ? "light" : "dark";

  const kanbanData = useAppSelector((state) => state.kanbanReducer.data);

  const { showAddTask, showAddColumn, showTaskItem } = useAppSelector(
    (state) => state.displayReducer.data
  );

  useEffect(() => {
    if (initialExecute) {
      // retrieved if there is any existed data otherwise the default data will be applied to the redux store
      dispatch(getData());
      initialExecute = false;

      // prevent send the initial state to the localStorage
      return;
    }

    dispatch(sendData(kanbanData));
  }, [kanbanData]);

  return (
    <div className={`main-container ${currentTheme}`}>
      {/* Modals */}
      <AnimatePresence>
        {showAddTask && <AddTask data={kanbanData} dispatch={dispatch} />}

        {showAddColumn && <AddColumn data={kanbanData} dispatch={dispatch} />}

        {showTaskItem.display && (
          <TaskItem
            data={kanbanData}
            dispatch={dispatch}
            targetTaskId={showTaskItem.targetTaskId}
          />
        )}
      </AnimatePresence>

      <ScrollContainer
        className="container"
        vertical={false}
        hideScrollbars={false}
        ignoreElements={".card-item"}
      >
        <SideNav data={kanbanData} dispatch={dispatch} />

        <Drag data={kanbanData} dispatch={dispatch} />
      </ScrollContainer>
    </div>
  );
}
