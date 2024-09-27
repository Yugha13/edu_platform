import { z } from "zod"

const adminModel = z.object({
    email    : z.string().email(),
    password : z.string().min(4),
    adminKey : z.string() 
})


export default adminModel;