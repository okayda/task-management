"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getData, sendData } from "@/redux/features/kanban-action";

import SideNav from "@/components/SideNav/SideNav";
import AddTask from "@/components/Forms/AddTask";
import Drag from "@/components/Drag/Drag";

import { AnimatePresence } from "framer-motion";

import { currentUser } from "@clerk/nextjs";
// import { UserButton, currentUser } from "@clerk/nextjs";
// import { createKanban, fetchKanbanById } from "@/lib/actions/kanban.action";

let initialExecute = true;

export default function page() {
  // const user = await currentUser();
  // if (!user) return null;

  // data is from the database
  // const existedUser = await fetchKanbanById(user.id);

  // Default data as an examples in order to demo the project immediately
  // const data = {
  //   id: user?.id || null,
  //   name: user?.firstName || null,
  //   sideNavList: [
  //     {
  //       title: "Marketing Plan",
  //       columns: {
  //         todo: data1,
  //         doing: [],
  //         done: [],
  //       },
  //     },
  //   ],
  // };

  // Not existed user will create a document data
  // if (!existedUser) {
  //   await createKanban({
  //     id: data.id,
  //     name: data.name,
  //     sideNavList: data.sideNavList,
  //   });
  // }

  const dispatch = useDispatch<AppDispatch>();

  // false => Light theme
  // true => Dark theme
  const theme = useAppSelector((state) => state.kanbanReducer.data.isDarkTheme);
  const currentTheme = !theme ? "light" : "dark";

  const kanbanData = useAppSelector((state) => state.kanbanReducer.data);
  const { showNav } = useAppSelector((state) => state.displayReducer.data);

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
    <>
      <div className={`main-container ${currentTheme}`}>
        <SideNav data={kanbanData} dispatch={dispatch} />

        <AnimatePresence>
          {showNav && <AddTask data={kanbanData} dispatch={dispatch} />}
        </AnimatePresence>

        <Drag data={kanbanData} dispatch={dispatch} />
      </div>
    </>
  );
}
