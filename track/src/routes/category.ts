
import { Hono } from "hono";
import { sign, decode, verify } from "hono/jwt";
import { createPrisma } from "../pr";
import { categorycheck} from "@codingwith/common-app";

export const category = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()


category.use('/*', async (c, next) => {
    const auth = c.req.header("Authorization") || ""
    const token = auth.split(" ")[1]
    const response = await verify(token, c.env.JWT_SECRET, "HS256");

    if (response.id) {
        c.set("userId", response.id as any);
        console.log("inside auth")
        await next()
    } else {
        c.status(403)
        return c.json({ error: "unauthorized" })
    }
    return c.json('finance')
})

//to create categories
category.post('/categories',async (c)=>{
    const prisma=createPrisma(c.env.DATABASE_URL)
    const body=await c.req.json()
    const userid=c.get("userId")
    const {success,data}=await categorycheck.safeParse(body);
    if(!success){
        c.status(400)
        return c.text('invalid input')
    }
    try{

        const exist=await prisma.category.findFirst({
          where:{
            name:data.name,
            userId:userid
          }
        })

        if(exist){
            c.status(400)
            return c.json({error: "category doesn't exist"})
        }

        const categorys=await prisma.category.create({
            data:{
                name:data.name,
                type:data.type,
                userId:userid
            }
        })

        return c.json({
           id:categorys.id,
            name:categorys.name,
            type:categorys.type})
    }catch(e){
        c.status(500)
        return c.text('something went wrong')
    }
   
})


//to get all categories
category.get('/categories',async (c)=>{
    const prisma=createPrisma(c.env.DATABASE_URL)
    const userid=c.get("userId")

    try{
     const   data=await prisma.category.findMany({
            where:{
                userId:userid
            },
            select:{
                name:true,
                id:true,
                type:true
            }
        })

        return c.json({
            data
        })
    }catch(e){
        c.status(500)
    return c.text('not found')
    }
})


//to delete categories
category.delete('/categories/:id',async (c)=>{
    const prisma=createPrisma(c.env.DATABASE_URL)
    const id=c.req.param("id")
    const userid=c.get("userId")
    console.log("inside delete category")
    try{
        const exist=await prisma.category.findFirst({
            where:{
                id:id,
                userId:userid
            }
        })

        if(!exist){
            c.status(404)
            return c.text('doest exist')
        }

        const remove=await prisma.category.delete({
            where:{
                 id:id
                }
            })

            return c.text('successfully deleted')
    } catch(e){
        c.status(500)
        return c.text('something went wrong')
    }
})