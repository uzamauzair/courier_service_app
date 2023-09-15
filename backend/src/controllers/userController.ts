import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    const prisma = new PrismaClient();

    const userExist = await getUserByEmail(email);
    if (userExist) {
        return { status: 403, message: "Already a user exist in this email", user: null }
    }

    const hashedPassowrd = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassowrd
        }
    }).catch((e: any) => {
        throw e;
    })
        .finally(async () => {
            await prisma.$disconnect();
        });

    return {
        status: 200,
        message: "User Registered successfully",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}

export const getUserByEmail = async (email: string) => {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    }).catch((e: any) => {
        throw e;
    }).finally(async () => {
        await prisma.$disconnect()
    });
    return user;
}

export const loginUser = async (email: string, password: string) => {
    const prisma = new PrismaClient();

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        // If the user doesn't exist, return an error
        if (!user) {
            return {
                status: 404,
                message: "User Not Found",
                user: null
            }
        }
        // Compare the entered password with the stored hashed password
        const passowrdMatch = await bcrypt.compare(password, user.password)

        if (user && !passowrdMatch) {
            return {
                status: 404,
                message: "Wrong Password",
                user: null
            }
        }

        if (passowrdMatch) {
            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, `${process.env.JWT_SECRET}`)
            console.log("Token ", token);

            return {
                status: 200,
                message: "Login Successfull",
                user: token
            }
        } else {
            // Passwords do not match, authentication failed
            return { status: 401, message: "Incorrect password", user: null };
        }
    } catch (error) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}