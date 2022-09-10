export interface User {
  id: number;
  email: string;
  password: string;
}

export type UserToken = Omit<User, "password">;

export type UserInsertData = Omit<User, "id">;
