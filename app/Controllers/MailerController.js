const nodemailer = require("nodemailer");


exports.sendMail = function(mailFrom, mailTo, subject, text, html){

    let transporter = nodemailer.createTransport({
        host: ENV.SMTP_HOST,
        port: ENV.SMTP_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
          user: ENV.SMTP_AUTH_USER, // generated ethereal user
          pass: ENV.SMTP_AUTH_PASS // generated ethereal password
        }
      });

 
    // send mail with defined transport object
    let info = transporter.sendMail({
        from: mailFrom, // sender address
        to: mailTo, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html // html body 
    });
 
    //console.log("Message sent: %s", info.messageId);
  
    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};