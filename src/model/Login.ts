import mongoose, { Schema, Document } from 'mongoose';

export interface ILogin extends Document {
  username: string;
  token: string;
}

const loginSchema = new Schema({
  username: { type: String, required: true },
  token: { type: String, required: true },
});

const Login = mongoose.model<ILogin>('Login', loginSchema);

export default Login;
