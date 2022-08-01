export interface Users {
  id:number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserInformation {
  data: Users[];
}
