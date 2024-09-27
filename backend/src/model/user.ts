import { z } from "zod"

const userModel = z.object({
    email    : z.string().email(),
    password : z.string().min(4)
})


export default userModel;