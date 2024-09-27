import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import AdminModel from "../model/admin";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

const login = async (req : Request, res : Response) => {
    const { email, password, adminKey } = req.body;
    const isVer = AdminModel.safeParse({email, password});
    console.log(isVer);
    if(!isVer.success) return res.json({ msg: "Provided input is invalid" });

    try {
        const isAdmin = await prisma.admin.findFirst({
            where : {
                email,
                password,
                adminKey
            }
        })
        // console.log(Admin);
        if(!isAdmin) return res.status(401).json({mes : "Invalid Credentials"});
        //Admin details are verified
        const token = jwt.sign({id : isAdmin.id},process.env.SECRET_KEY as string);
        res.cookie("token", token);
        return res.json("Admin Logged in");
    } catch (e) {
        return res.status(401).json({mes : "Admin not found"});
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

const updateCourse = async (req : Request, res : Response) => {
    const { id } = req.params;
    const {datas} = req.body;
    // console.log(id);
    try {
        const course = await prisma.courses.update({
            where : { id },
            data : {...datas}
        });
        return res.json("course updated");
    } catch (e) {
        return res.json("course code is wrong");
    }
}

const deleteCourse = async (req : Request, res : Response) => {
    const { id } = req.params;
    try {
        const course = await prisma.courses.delete({
            where : { id }
        });
        // console.log(course);
        return res.json("course deleted");
    } catch (e) {
        return res.json("course code is wrong");
    }
}


export {
    login,
    allCourse,
    updateCourse,
    deleteCourse
}