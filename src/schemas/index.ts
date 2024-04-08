import * as z from "zod"

export const LoginSchema = z.object({
    email:z.string().email({
        message:"email is required"
    }),
    password:z.string({
        invalid_type_error:"must be a string"
    }).min(1,{
        message:"password is required"
    }),
    token:z.optional(z.string())
})
export const RegisterSchema = z.object({
    email:z.string().email({
        message:"email is required"
    }),
    token:z.optional(z.string()),
    firstName : z.optional(z.string()),
    lastName: z.optional(z.string()),
    password:z.optional(z.string())
})
export const ResetPasswordSchema = z.object({
    email:z.optional(z.string().email({
        message:"email is required"
    })),
    token:z.optional(z.string()),
    password:z.optional(z.string())
})
export const ResetPasswordFinalStepSchema = z.object({
    
    password:z.string({
        invalid_type_error:"must be a string"
    }).min(6,{
        message:"minimum 6 charaters required"
    }),
})
export const JoinSchema = z.object({
    password:z.string({
        invalid_type_error:"must be a string"
    }).min(6,{
        message:"minimum 6 charaters required"
    }),
    firstName : z.string().min(3,{message:"First name is required"}),
    lastName: z.string(),
    token: z.string()

})
export const TokenSchema = z.object({
    token: z.string().min(6,{message:"Invalid token"})

})
export const SettingsSchema = z.object({
    firstName: z.optional(z.string()),
    lastName: z.optional(z.string()),
    email:z.optional(z.string()),
    password:z.optional(z.string()),
    newPassword:z.optional(z.string()),
    isTwoFactorEnabled:z.boolean(),
    token:z.optional(z.string()),
})