export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export type Database = {
  users: User;
};

export type SignUpState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message: string | null;
};
