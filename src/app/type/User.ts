export type User = {
    _id: string, // nếu dùng nodejs thì là string
    name: string,
    email: string,
    password: string,
    status:number 
  };
  export type UserAfter = {
    name?: string,
    email?: string,
    password?: string,
    status?:number 
  };