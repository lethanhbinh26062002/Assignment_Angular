export type Category = {
    _id: string, // nếu dùng nodejs thì là string
    name: string,
    status:number 
  };
  export type CategoryAfter = {
    name?: string,
    status?:number 
  };