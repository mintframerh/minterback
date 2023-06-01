const nodemailer = require("nodemailer");

 async function sendEmail(to, subject, html) {
     let transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
         user: process.env.GMAILUSERR,
         pass: process.env.GMAILPASS,
       },
     });
     
  let info = await transporter.sendMail(
    {
      from: '"Developer" <davisdelilah908@gmail.com>',
      to: to,
      subject: subject,
      html: html,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        // do something useful
        res.send("Registered Successfully");
      }
    }
  );

 
}

module.exports = sendEmail


