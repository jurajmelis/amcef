import mongoose, { Schema, Document } from 'mongoose';

export interface IToDo extends Document {
  title: string;
  description: string;
  deadline: Date;
  createdBy: string;
  users: [string];
}

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: {type: Date, required: true},
  createdBy: {type: String, required: true},
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
});

const ToDo = mongoose.model<IToDo>('ToDo', todoSchema);

export default ToDo;
