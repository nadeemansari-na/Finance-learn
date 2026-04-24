import {number, z} from "zod";

export const  check=z.object({
  email:z.string().email(),
  password:z.string().min(6)
})

export const transcheck=z.object({
   amount:z.number().positive("Amount must be greater than 0"),
   type:z.enum(["income","expense"]),
   categoryId:z.string().min(1,"category is required")
})
export const categorycheck=z.object({
    name:z.string().min(1,"category name is required").max(50,"too long"),
    type:z.enum(["income","expense"])
})


export type Check=z.infer<typeof check>
export type Trancheck=z.infer<typeof transcheck>
export type Categorycheck=z.infer<typeof categorycheck>