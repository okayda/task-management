"use client";

import { useState, useEffect } from "react";

import Drag from "@/components/Drag/Drag";

import SideNav from "@/components/SideNav/SideNav";

import { UserButton, currentUser } from "@clerk/nextjs";
import { createKanban, fetchKanbanById } from "@/lib/actions/kanban.action";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

import { getData, sendData } from "@/redux/features/kanban-action";

let initialExec = true;

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

  useEffect(() => {
    if (initialExec) {
      // retrieved if there is any existed data otherwise the default data will be applied to the redux store
      dispatch(getData());
      initialExec = false;

      // prevent send the initial state to the localStorage
      return;
    }

    // console.log(kanbanData);

    dispatch(sendData(kanbanData));
  }, [kanbanData]);

  return (
    <>
      <div className={`main-container ${currentTheme}`}>
        <SideNav dispatch={dispatch} />

        <Drag data={kanbanData} dispatch={dispatch} />
      </div>
    </>
  );
}
