export type User = {
  _id: string;
  email: string;
  password: string;
};
export type UserInputs = Omit<User, "id">;
