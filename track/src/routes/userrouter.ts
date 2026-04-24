import { Hono } from "hono";
import { createPrisma } from "../pr";
import { Categorycheck, categorycheck, check } from "@codingwith/common-app";
import { sign,verify,decode } from "hono/jwt";

export const userrouter = new Hono<{   Bindings: {
  DATABASE_URL: string
  JWT_SECRET: string
  } }>()



userrouter.post('/signup', async (c) => {
  // const users=await prisma.user.findMany()

  const prisma=createPrisma(c.env.DATABASE_URL);
  console.log(c.env.JWT_SECRET)
  console.log(c.env.DATABASE_URL)
  
  const body=await c.req.json();
  const {success}=check.safeParse(body)
  if(!success){
    return c.text('invalid input')
  }
  try{
    const user= await prisma.user.create({
       data:{
         email:body.email,
         password:body.password
       },
     })
     const token=await sign({id:user.id},c.env.JWT_SECRET)
     
      //create automatically categories in signup
      
        const expenseCategories = ["Food", "Travel", "Shopping"];
const incomeCategories = ["Salary", "Investment", "Refund"];

const categories = [
    ...expenseCategories.map(name => ({
      name,
      type: "expense",
    })),
    ...incomeCategories.map(name => ({
      name,
      type: "income",
    })),
  ]

    const  {success,data}=await categorycheck.safeParse(categories)
 
    if(!success){
      c.status(400);
      return c.text('invalid input')
    }
    
    await prisma.category.createMany({
      data : {
        name:data.name,
        type:data.type,
        userId:user.id
      }
    })
     
     return c.json({
       token:token,
       msg:"user created successfully",
       email:body.email
     })
  } catch(e){
    console.log(e)
    c.status(411)
   return c.text('invalid')
  } 

})



userrouter.get('/signin',async (c)=>{
const prisma=createPrisma(c.env.DATABASE_URL);

  console.log("has it reached")
  const email=c.req.query('email');
  const password=c.req.query('password')
  console.log(email,password)
  try{
    const user=await prisma.user.findUnique({
      where:{
        email:email,
        password:password
      }
    })
    if(!user){
      c.status(403);
      return c.json({error :"user not found"})
    }
  
    const token=await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({
      token,
      email:user.email
    })

  }catch(e){
    c.status(403)
    return c.text("invalid")
  }

})
