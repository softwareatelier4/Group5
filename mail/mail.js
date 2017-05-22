'use strict';
const nodemailer = require('nodemailer');

let smtpConfig = {
    host: 'hos106.unaxus.net',
    port: 25,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: 'jobadvisor@samuelebischof.ch',
        pass: 'SxBz.7-TCbvM#6*%8y'
    }
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(smtpConfig);

// setup email data with unicode symbols
let mailOptions = {
    from: '"no-reply@jobadvisor.ch" <jobadvisor@samuelebischof.ch>', // sender address
    to: '', // list of receivers
    subject: '', // Subject line
    // text: 'Hello world ?', // plain text body
    html: '' // html body
};

let sendMailTo = function (address, content, subject) {
    mailOptions.to = address;
    mailOptions.html = content;
    mailOptions.subject = subject;
    console.log("Email:",mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

exports.sendMailTo = sendMailTo;
