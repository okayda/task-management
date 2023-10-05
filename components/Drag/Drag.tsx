"use client";
import React from "react";
import { ComponentProps } from "@/constants/types";
import { updatePosition } from "@/redux/features/kanban-slice";
import { toggleModalTask } from "@/redux/features/display-slice";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { onDragEnd } from "./DragHandler";

import style from "./Drag.module.scss";

export default React.memo(({ data, dispatch }: ComponentProps) => {
  // id is not valid
  if (!data.userId) return null;

  const columnsObj: any = {};

  let targetDrag: string | null = null;

  // creating columns for displaying the items in the drag
  data.sideNavList.forEach((li) => {
    if (!li.isActive) return;

    targetDrag = li.titleId;

    for (const [key, value] of Object.entries(li.columns)) {
      columnsObj[key] = {
        name: key,
        items: value,
      };
    }
  });

  const updateDrag = function (newPosition: any): void {
    dispatch(updatePosition({ targetId: targetDrag, newPosition }));
  };

  const openModalTask = function (itemId: string): void {
    dispatch(
      toggleModalTask({
        showModalTask: {
          display: true,
          targetTaskId: itemId,
        },
      })
    );
  };

  return (
    <div className={style.drag}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columnsObj, updateDrag)}
      >
        {Object.entries(columnsObj).map(
          ([columnId, column]: [string, any], index) => {
            const length = column.items.length;

            return (
              <div key={index}>
                <div className={style.drag__title}>
                  <span className={style["drag__title--" + (index + 1)]}>
                    &nbsp;
                  </span>
                  <h3>
                    {column.name}({length})
                  </h3>
                </div>

                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, _) => {
                    return (
                      <div
                        className={style.drag__column}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {column.items.map((item: any, index: any) => {
                          return (
                            <div
                              onClick={() => openModalTask(item.itemId)}
                              key={item.itemId}
                            >
                              <Draggable
                                draggableId={item.itemId}
                                index={index}
                              >
                                {(provided, _) => {
                                  return (
                                    <div
                                      className={style.drag__item}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <h4>{item.itemTitle}</h4>

                                      <p>
                                        0 of {item.subTasks.length} subtasks
                                      </p>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            </div>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          }
        )}
      </DragDropContext>

      <div className={style.drag__emptyColumn}>
        <div className={style["drag__emptyColumn--title"]}>&nbsp;</div>
        <button>New Column</button>
      </div>
    </div>
  );
});
