
import { Hono } from "hono";
import { sign, decode, verify } from "hono/jwt";
import { transcheck } from "@codingwith/common-app";
import { createPrisma } from "../pr";

export const transaction = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()


transaction.use('/*', async (c, next) => {
    const auth = c.req.header("Authorization") || ""
    console.log("auth",auth)
    const token = auth.split(" ")[1]
    console.log("inside transaction auth")
    const response = await verify(token, c.env.JWT_SECRET, "HS256");

    if (response.id) {
        c.set("userId", response.id as any);
        await next()
    } else {
        c.status(403)
        return c.json({ error: "unauthorized" })
    }
    return c.json('finance')
})

//to create transactions
transaction.post('/transactions', async (c) => {
    const prisma = createPrisma(c.env.DATABASE_URL)
    const body = await c.req.json();
    const userid=c.get("userId")
    const { success, data } = transcheck.safeParse(body);
    if (!success) {
        c.status(400)
        return c.json({ error: "invalid input" });
    }
    try {
        const exist=await prisma.category.findFirst({
            where:{
                id:data.categoryId,
                userId:userid
            }
        })
        if(!exist){
            c.status(404)
            return c.text('category does not exist')
        }

        const create = await prisma.transaction.create({
            data: {
                amount: data.amount,
                type: data.type,
                categoryId: data.categoryId,
                userId: userid
            },
        })

        return c.json({
            data: create
        })
    } catch (e) {
        c.status(500)
        return c.text('something went wrong')
    }

})


//to list all transactions
transaction.get('/transactions', async (c) => {
    const prisma = createPrisma(c.env.DATABASE_URL);
    console.log("reached backend")
    try {
        const id = c.get("userId")

        const alldata = await prisma.transaction.findMany({
            where: {
                userId: id
            },
            orderBy: {
                createAt: 'desc'
            },
            select: {
                id:true,
                amount: true,
                type: true,
                createAt: true,
                user: {
                    select: {
                        email: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
          alldata
        })
    } catch (e) {
        c.status(500)
        return c.text('something went wrong')
    }
})


//to get specific transaction
transaction.get('/transactions/:id', async (c) => {
    const prisma = createPrisma(c.env.DATABASE_URL)
    const id = c.req.param("id")
    const userid = c.get("userId")
    console.log("inside specific")
    try {
        const data = await prisma.transaction.findFirst({
            where: {
                id: id,
                userId: userid
            },
            select: {
                amount: true,
                type: true,
                createAt: true,
                user: {
                    select: {
                        email: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }

        })

        if (!data) {
            c.status(404);
            return c.text('Transaction not found');
        }

        return c.json({ data })
    } catch (e) {
        c.status(500)
        return c.text('not found')
    }
})

//to update transaction
transaction.put('/transactions/:id', async (c) => {
    const prisma=createPrisma(c.env.DATABASE_URL)
    const userid=c.get("userId")
    const id=c.req.param("id")
    const body=await c.req.json()
    console.log("inside updating transaction")
    const {success,data}=await transcheck.safeParse(body)

    if(!success){
        c.status(400)
        return c.json({error:"invalid input"})
    }

    try{
        const updatedtransaction=await prisma.transaction.update({
            where:{
                userId:userid,
                id:id
            },
            data:{
                amount:data.amount,
                type:data.type,
                categoryId:data.categoryId
            }
        })

        return c.json({
            data:updatedtransaction
        })
    }catch(e){
        c.status(500)
        return c.text('something went wrong')
    }

})

//to delete transaction
transaction.delete('/transactions/:id', async (c) => {
    const prisma=createPrisma(c.env.DATABASE_URL)
    const id=c.req.param("id")
    const userid=c.get("userId")

    try{
        const exist=await prisma.transaction.findFirst({
            where:{
                id:id,
                userId:userid
            }
        })

        if(!exist){
            c.status(400)
            return c.json({error:"transaction not found"})
        }

        const remove=await prisma.transaction.delete({
            where:{
                id:id
            }
        })
        return c.text('successfully deleted')
    }catch(e){
        c.status(500)
        c.text('something went wrong')
    }

})