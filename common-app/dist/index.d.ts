import { z } from "zod";
export declare const check: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const transcheck: z.ZodObject<{
    amount: z.ZodNumber;
    type: z.ZodEnum<{
        income: "income";
        expense: "expense";
    }>;
    categoryId: z.ZodString;
}, z.core.$strip>;
export declare const categorycheck: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<{
        income: "income";
        expense: "expense";
    }>;
}, z.core.$strip>;
export type Check = z.infer<typeof check>;
export type Trancheck = z.infer<typeof transcheck>;
export type Categorycheck = z.infer<typeof categorycheck>;
//# sourceMappingURL=index.d.ts.map