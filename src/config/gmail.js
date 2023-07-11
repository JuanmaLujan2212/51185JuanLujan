import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "juanmalujantmp@gmail.com",
        pass: "oetmrngmoownliic"
    }
})

export { transporter }