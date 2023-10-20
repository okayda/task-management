"use client";
import React from "react";
import Image from "next/image";
import { ComponentProps } from "@/types";
import { updatePosition } from "@/redux/features/kanban-slice";
import {
  toggleModalTask,
  toggleAddColumnBoard,
  toggleAddNewBoard,
} from "@/redux/features/display-slice";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { onDragEnd } from "./DragHandler";

import plus from "../../public/assets/plus.svg";
import style from "./Drag.module.scss";

export default React.memo(({ data, dispatch }: ComponentProps) => {
  // id is not valid
  if (!data.userId) return null;

  const boardsLength = data.sideNavList.length;

  const columnsObj: any = {};

  let targetDrag: string | null = null;

  // creating columns for displaying the items in the drag board
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

  const showModalTask = function (itemId: string): void {
    dispatch(
      toggleModalTask({
        showModalTask: {
          display: true,
          targetTaskId: itemId,
        },
      })
    );
  };

  const showAddColumnBoard = function (): void {
    dispatch(
      toggleAddColumnBoard({
        showAddColumnBoard: true,
      })
    );
  };

  const showAddNewBoard = function (): void {
    dispatch(toggleAddNewBoard({ showAddNewBoard: true }));
  };

  // If no existed board will gonna display this
  // Call To Action
  const CTA = function () {
    return (
      <div className={style.dragEmpty__content}>
        <p>This board is empty. Create a new column to get started.</p>
        <button onClick={showAddNewBoard}>
          Create New Board
          <Image src={plus} alt="" height={20} width={20} />
        </button>
      </div>
    );
  };

  return (
    <div className={boardsLength ? style.drag : style.dragEmpty}>
      {boardsLength ? (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columnsObj, updateDrag)}
        >
          {Object.entries(columnsObj).map(
            ([columnId, column]: [string, any], index) => {
              const length = column.items.values.length;

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
                          {column.items.values.map((item: any, index: any) => {
                            return (
                              <div
                                className="card-item"
                                onClick={() => showModalTask(item.itemId)}
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
      ) : (
        <CTA />
      )}

      {/* Hide the AddNewColumn if there is no existed board */}
      {boardsLength > 0 && (
        <div className={style.drag__emptyColumn}>
          <div className={style["drag__emptyColumn--title"]}>&nbsp;</div>
          <button onClick={showAddColumnBoard}>New Column</button>
        </div>
      )}
    </div>
  );
});
