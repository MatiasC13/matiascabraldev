
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const nodemailer = require("nodemailer");
const express = require("express");



const app = express();

if (process.env.NODE_ENV !== "production") {
require("dotenv").config();
}

app.use(logger("dev"));

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "./client")));



let contador = 0;
app.get("*", function (req, res) {
  contador++;
  console.log("Visitas:", contador);
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  console.log("ip:", ip);
  res.sendFile(
    path.join(__dirname, "./client/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});



app.post("/api/contact", async (req, res) => {
const { email, name, subject, message, address, owner } = req.body;

  




  const mailData = {
    from: {
      name: owner,
      address: "gregory.notificaciones@gmail.com",
    },
    replyTo: address,
    to: address,
    // bcc: address,
    subject: `Contacto Portafolio ${subject}`,

    html: `<p>Hola ${name} te ha enviado un mensaje<p>${message}</p> <p>responder ${email}</p>`,
  };
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465, 
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);

        res.status(500).json(reject(err));
      } else {
        console.log(info);

        res.status(200).json(resolve(info));
      }
    });
  });
});

app.listen(3000, () => {
  console.log("Server on port", 3000);
});

