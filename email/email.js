const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, { name, id }) => {
  sgMail.send({
    to: email,
    from: 'geraldhug92@gmail.com',
    subject: 'Thanks for joining in',
    text: `Welcome to the app ${name}, Let me know how you get along with the app.
    
    Please Verify your email by clicking the link
    localhost:5000/api/users/${id}
    `,
  })
  console.log('email sent')
}

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'geraldhug92@gmail.com',
    subject: 'Sorry to see you go',
    text: `Goodbye! ${name}, Hope to see you back sometime soon.`,
  })
  console.log('email sent')
}

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
}
