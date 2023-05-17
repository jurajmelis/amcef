import ToDo, { IToDo } from "../model/ToDo";
import mongoose from "mongoose";

export async function getAllToDos(): Promise<IToDo[]> {
  return ToDo.find({});
}

export async function createToDo(title: string, description: string, deadline: Date, createdBy?: string, userId?: string): Promise<void> {
  const newToDo: IToDo = new ToDo({
    title,
    description,
    deadline,
    createdBy,
    users: [userId],
  });

  await newToDo.save();
}

export async function updateUserInToDo(userId: string, id: string): Promise<void> {
  const updatedToDo = await ToDo.findById(id);
  if (!updatedToDo) {
    throw new Error("updatedToDo not found");
  }
  updatedToDo.users.push(userId);
  await updatedToDo.save();
}

export async function appendFieldToToDo(fieldName: string, fieldType: any, fieldValue: any, id: string): Promise<void> {
  const updatedToDo = await ToDo.findById(id).select("-_id");
  if (!updatedToDo) {
    throw new Error("updatedToDo not found");
  }
  ToDo.schema.add({ [fieldName]: fieldType });
  const UpdatedToDo = mongoose.model<IToDo>("ToDo", ToDo.schema);
  const todoFields = { ...updatedToDo?.toObject(), [fieldName]: fieldValue };
  const todo = new UpdatedToDo(todoFields);
  await todo.save();
}
