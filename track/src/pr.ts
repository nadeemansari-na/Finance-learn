import { PrismaClient } from "./generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

export const createPrisma=(accelerateurl:string)=>
        new PrismaClient ({
            accelerateUrl:accelerateurl
        }).$extends(withAccelerate())
