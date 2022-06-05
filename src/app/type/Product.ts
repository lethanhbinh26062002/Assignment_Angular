export type Product = {
  id: number, // nếu dùng nodejs thì là string
  name: string,
  price: number,
  description: string,
  status:number 
};
export type ProductAfter = {
  name?: string, 
  price?: number,
  description?: string,
  status?:number
};