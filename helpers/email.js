var nodemailer = require('nodemailer');

const sendOffer = (sellerEmail, message, listingBrand, listingModel, buyerEmail) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'getr.offer@gmail.com',
      pass: 'labber2021'
    }
  });

  var mailOptions = {
    from: 'getr.offer@gmail.com',
    to: sellerEmail,
    subject: 'New offer on ' + listingBrand + ' ' + listingModel,
    text: message + 'Please reply at: ' + buyerEmail
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
exports.sendOffer = sendOffer;
