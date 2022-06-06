export type Product = {
  _id: string, // nếu dùng nodejs thì là string
  name: string,
  price: number,
  sale_price:number,
  img:string,
  // category: number,
  description: string,
  status:number 
};
export type ProductAfter = {
  name?: string, 
  price?: number,
  sale_price?: number,
  img?: string
  //category: number,
  description?: string,
  status?:number
};