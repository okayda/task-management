import { connectToDB } from "../mongoose";
import Kanban from "../models/kanban.model";

interface Params {
  id: string | null;
  name: string | null;
  sideNavList: any;
  // sideNavList: {
  //   title: string;
  //   columns: {
  //     todo: {
  //       id: string | null;
  //       title: string;
  //       description: string;
  //       subItems: { item: string; isComplete: boolean }[];
  //     }[];
  // doing: {
  //   id: string | null;
  //   title: string;
  //   description: string;
  //   subItems: { item: string; isComplete: boolean }[];
  // }[];
  // done: {
  //   id: string | null;
  //   title: string;
  //   description: string;
  //   subItems: { item: string; isComplete: boolean }[];
  // }[];
  // };
  // }[];
}

export async function createKanban({ id, name, sideNavList }: Params) {
  try {
    connectToDB();

    await Kanban.create({ id, name, sideNavList });
  } catch (error: any) {
    throw new Error(`Failed to create kanban: ${error.message}`);
  }
}

export async function fetchKanbanById(id: string) {
  try {
    connectToDB();

    const kanbanData = await Kanban.findOne({ id });

    console.log(kanbanData);

    // not existed user
    if (!kanbanData) return null;

    return kanbanData;
  } catch (error: any) {
    throw new Error(`Failed to fetch by id the kanban: ${error.message}`);
  }
}

export async function updateKanban() {}

export async function insertKanban() {}
