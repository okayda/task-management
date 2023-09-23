"use client";
import React from "react";
import { ComponentProps } from "@/constants/types";
import { updatePosition } from "@/redux/features/kanban-slice";

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

  return (
    <div className={style.drag}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columnsObj, updateDrag)}
      >
        {Object.entries(columnsObj).map(
          ([columnId, column]: [string, any], index) => {
            return (
              <div key={index}>
                <div className={style.drag__title}>
                  <span className={style["drag__title--" + (index + 1)]}>
                    &nbsp;
                  </span>
                  <h3>{column.name}</h3>
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
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
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
                                    {item.title}
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
