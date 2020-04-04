const sgMail = require("@sendgrid/mail");

const sgKey = process.env.SENDGRID_API_KEY;

module.exports = function sendMail({ subject, text }) {
  sgMail.setApiKey(sgKey);

  const msg = {
    to: "russellgoldenberg@gmail.com",
    from: "russellgoldenberg@gmail.com",
    subject,
    text,
  };

  sgMail
    .send(msg)
    .then(() => process.exit(1))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
