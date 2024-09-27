import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userModel from "../model/user";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

const login = async (req : Request, res : Response) => {
    const { email, password } = req.body;
    const isVer = userModel.safeParse({email, password});
    console.log(isVer);
    if(!isVer.success) return res.json({ msg: "Provided input is invalid" });

    try {
        const isUser = await prisma.user.findFirst({
            where : {
                email,
                password
            }
        })
        // console.log(user);
        if(!isUser) return res.status(401).json({mes : "Invalid Credentials"});
        //user details are verified
        const token = jwt.sign({id : isUser.id},process.env.SECRET_KEY as string);
        res.cookie("token", token);
        return res.json("User Logged in");
    } catch (e) {
        return res.status(401).json({mes : "User not found"});
    }
}

const signup = async (req : Request, res : Response) => {
    const { email, password } = req.body;
    const isVer = userModel.safeParse({email, password});
    console.log(isVer);
    if(!isVer.success) return res.json({ msg: "Provided input is invalid" });
    try {
        const user = await prisma.user.create({
            data : {
                email,
                password
            }
        })
        // console.log(user);
        return res.json("User Created");
    } catch (e) {
        // console.log(e);
        return res.status(401).json({mes : "User already exist"});
    }
}


const allCourse = async (req : Request, res : Response) => {
    try {
        const courses = await prisma.courses.findMany({})
        console.log(courses);
        return res.json({allCourse : courses});
    } catch (e) {
        console.log(e);
        return res.status(404).json(e);
    }
}

const courseId = async (req : Request, res : Response) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const course = await prisma.courses.findFirst({
            where : { id }
        });
        return res.json({details : course});
    } catch (e) {
        return res.json("course code is wrong");
    }
}


export {
    login,
    signup,
    allCourse,
    courseId
}