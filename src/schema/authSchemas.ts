import { z } from 'zod';

export interface ISigninformValue {
    email: string;
    password: string;
}

export const signinSchema = z.object({
    email: z.string() .trim().email({ message: 'Invalid email' }),
    password: z
        .string()
        .trim()
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password must be at most 20 characters long')
        .refine((s) => /[a-zA-Z]/.test(s), {
            message: 'Password must contain at least one letter',
        })
        .refine((s) => /\d/.test(s), {
            message: 'Password must contain at least one number',
        })
        .refine((s) => /[@$!%*#?&]/.test(s), {
            message: 'Password must contain at least one special character',
        }),
});

export interface ISignupformValue {
    email: string;
    name: string;
    password: string;
    repassword: string;
}

export const signupSchema = z
    .object({
        email: z.string() .trim().email({ message: 'Invalid email' }),
        name: z
            .string()
            .trim()
            .min(1, 'Name is required')
            .max(50, 'Name must be at most 50 characters long')
            .regex(
                /^[a-zA-Z\s]+$/,
                'Name must contain only letters and spaces'
            ),

        password: z
            .string()
            .trim()
            .min(6, 'Password must be at least 6 characters long')
            .max(20, 'Password must be at most 20 characters long')
            .refine((s) => /[a-zA-Z]/.test(s), {
                message: 'Password must contain at least one letter',
            })
            .refine((s) => /\d/.test(s), {
                message: 'Password must contain at least one number',
            })
            .refine((s) => /[@$!%*#?&]/.test(s), {
                message: 'Password must contain at least one special character',
            }),
        repassword: z.string() .trim(),
    })
    .refine(
        (schema) => {
            return schema.password == schema.repassword;
        },
        {
            message: 'Passwords must match',
            path: ['repassword'],
        }
    );
