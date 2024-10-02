import nodemailer from "nodemailer";

// Generate a 6-digit verification code
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
};

// Function to send verification email
export const sendVerificationEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "Your Email Service", // e.g., Gmail, SendGrid, etc.
    auth: {
      user: "your-email@example.com", // Your email address
      pass: "your-email-password", // Your email password or application-specific password
    },
  });

  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Verification Code",
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};
