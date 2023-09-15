import { Response } from "express";
import { emailFormating, passwordFormating } from "../utils/constants";

export function validateRegisterUser(name: string, email: string, password: string, res: Response) {

    if (!name || name.split(" ").join("").length === 0) {
        return {
            status: 500, message: "name is invalid", user: null
        };
    }
    if (!email || email.split(" ").join("").length === 0) {
        return {
            status: 500, message: "email is invalid", user: null
        };
    }
    if (!password || password.split(" ").join("").length === 0) {
        return {
            status: 500, message: "password is invalid", user: null
        };
    }
    //check password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    const passwordFormat = passwordFormating;

    // check email
    const emailFormat = emailFormating;

    if (!passwordFormat.test(password)) {
        return { status: 500, message: "Password should be between 6 to 20 characters and should contain at least one numeric, one uppercase, and one lowercase letter" }
    }
    if (!emailFormat.test(email)) { // Use email variable here
        return { status: 500, message: "Invalid Email address" }
    }

    return { status: 200, Success: true }
}

export function validateLogin(email: string, password: string, res: Response) {
    if (!email || email.split(" ").join("").length === 0) {
        return {
            status: 500, message: "email is invalid", user: null
        };
    }
    if (!password || password.split(" ").join("").length === 0) {
        return {
            status: 500, message: "password is invalid", user: null
        };
    }
    //check password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    const passwordFormat = passwordFormating;

    // check email
    const emailFormat = emailFormating;

    if (!passwordFormat.test(password)) {
        return { status: 500, message: "Password should be between 6 to 20 characters and should contain at least one numeric, one uppercase, and one lowercase letter" }
    }
    if (!emailFormat.test(email)) { // Use email variable here
        return { status: 500, message: "Invalid Email address" }
    }

    return { status: 200, Success: true }
}