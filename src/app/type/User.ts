export type User = {
    _id: string,
    name: string,
    email: string,
    password: string,
    status:number ,
    role:number
  };
  export type UserAfter = {
    name?: string,
    email?: string,
    password?: string,
    status?:number ,
    role?:number
  };
  export type TypeLogin = {
    email: string,
    password: string
  };
  export type TypeSignup = {
    named: string,
    email: string,
    password: string
  };
  export type TypeLoginResponse = {
    accessToken: string,
    user: {
      email: string
    }
  }