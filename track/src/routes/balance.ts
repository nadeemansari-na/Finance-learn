
import { Hono } from "hono";
import { sign, decode, verify } from "hono/jwt";
import { createPrisma } from "../pr";

export const balance = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

interface balancetype{
    amount:number,
    type:"income" | "expense",
    createAt:Date
}


balance.use('/*', async (c, next) => {
    const auth = c.req.header("Authorization") || ""
    const token = auth.split(" ")[1]
    const response = await verify(token, c.env.JWT_SECRET, "HS256");
        console.log("user info :",response)
    if (response.id) {
        c.set("userId", response.id as any);
        await next()
    } else {
        c.status(403)
        return c.json({ error: "unauthorized" })
    }
    return c.json('finance')
})


balance.get('/balances', async (c) => {
    const prisma = createPrisma(c.env.DATABASE_URL)
    const userid = c.get("userId")

    try {
        const data = await prisma.transaction.findMany({
            where: {
                userId: userid
            },
            select: {
                amount: true,
                type: true
            }
        })

        const tincome = data
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0)

        const texpense = data
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = tincome - texpense;

        return c.json({
            income: tincome,
            expense: texpense,
            balance: balance
        })
    } catch (e) {
        c.status(500)
        return c.text("something went wrong")
    }
})


//get balance history
balance.get('/balance-history',async (c)=>{
    const prisma=createPrisma(c.env.DATABASE_URL);
    const userid=c.get("userId");
         let balancec=0;
console.log("id :",userid)
    try{
        const alltransfer:balancetype[]=await prisma.transaction.findMany({
            where:{
                userId:userid
            },
            select:{
                amount:true,
                type:true,
                createAt:true
            }
        })
console.log(alltransfer)
        if(!alltransfer) return c.text('something went wrong while fetching')

         alltransfer.sort((a,b)=>
            new Date(a.createAt).getTime()- new Date(b.createAt).getTime()
         )   

    const result=  alltransfer.map((it)=>{
            if(it.type=="income"){
                    balancec +=it.amount;
            } else{
                balancec -=it.amount;
            }
            
            return {
                amount :it.amount,
                date:new Date(it.createAt).toLocaleDateString('en-IN',{ day:'2-digit',month:'short'}),
                balance:balancec
            }
        })
            
            return c.json({
                result
            })

    }catch(e){
        return c.text('error occured ')
    }
})