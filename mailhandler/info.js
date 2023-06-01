const sendEmail=require('./sendMail')
const postInfo = async(req, res) => {
  try {
    const { email, message, name } = req.body;
    const subject = `
    <P>EMAIL: ${email}</P>
    <P>MESSAGE: ${message}</P>
    <P>NAME: ${name}</P>
    `;
    sendEmail('techathrone22@gmail.com','from the website',subject)
    res.status(200).send({message:"sent"})
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports={postInfo}


