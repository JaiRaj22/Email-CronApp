const expess = require("express");
const {response} = require("express");
const nodemailer = require('nodemailer');
const port = 5000;
const cron = require("node-cron");
require("dotenv").config();

const app = expess();

function sendMail() {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        const mail_configs = {
            from: process.env.USER,
            to: process.env.RECIPIENT,
            subject:"test email",
            text:"hello world"
        }
        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error)
                return reject({message:'something went wrong'})
            }
            return resolve({message:'email sent'})
        })
    })
}

app.get("/sendemail", (req, res) => {
  sendMail()
    .then((response) => res.send(response.message))
    .catch((error) => res.send(500).send(error.message));
});

const task = () => {
    console.log("runnwing a tawsk evewy minutwe");
}

cron.schedule("* * * * *", task);

app.listen(port, () => console.log(`Server started on port ${port}`));
