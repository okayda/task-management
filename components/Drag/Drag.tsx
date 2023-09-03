import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Columns, taskData, onDragEnd } from "./DragHandler";

import style from "./Drag.module.scss";

const Drag: React.FC = () => {
  const data1 = [
    { id: "0", content: "Build UI for onboarding flow" },
    { id: "2", content: "Build UI for search" },
    { id: "3", content: "Build settings UI" },
    { id: "4", content: "QA and test all major user Journeys" },
  ];

  const data2 = [
    { id: "5", content: "Design settings and search pages" },
    { id: "6", content: "Add account management endpoints" },
    { id: "7", content: "Design onboarding flow" },
    { id: "8", content: "Add search endpoints" },
    { id: "9", content: "Add authentication endpoints" },
    {
      id: "10",
      content:
        "Research pricing points of various competitors and trial different business models",
    },
  ];

  const data3 = [
    { id: "11", content: "Conduct 5 wireframe tests" },
    { id: "12", content: "Create wireframe prototype" },
    { id: "13", content: "Review results of usability tests and iterate" },
    {
      id: "14",
      content:
        "Create paper prototypes and conduct 10 usability tests with potential customers",
    },
    { id: "15", content: "Market discovery" },
    {
      id: "16",
      content: "Competitor analysis",
    },
    { id: "17", content: "Research the market" },
  ];

  const data4 = [{ id: "18", content: "awit sayo" }];

  const taskStatus: Columns = {
    requested: {
      name: "test",
      items: data1,
    },
    toDo: {
      name: "test",
      items: data2,
    },
    inProgress: {
      name: "test",
      items: data3,
    },
  };

  const [columns, setColumns] = useState<Columns>(taskStatus);

  return (
    <div className={style.drag}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div>
              <div className={style.drag__title}>
                <span className={style["drag__title--" + (index + 1)]}>
                  &nbsp;
                </span>
                <h3>{column.name}</h3>
              </div>

              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      className={style.drag__column}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {column.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className={style.drag__item}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {item.content}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>

      <div className={style.drag__emptyColumn}>
        <div className={style["drag__emptyColumn--title"]}>&nbsp;</div>
        <button>New Column</button>
      </div>
    </div>
  );
};

export default Drag;
