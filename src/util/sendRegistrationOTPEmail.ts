import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const emailConfiguration: any = {
    service: process.env.EMAIL_CONFIG_SERVICE,
    host: process.env.EMAIL_CONFIG_HOST,
    port: Number(process.env.EMAIL_CONFIG_PORT),
    secure: Boolean(process.env.EMAIL_CONFIG_SECURE),
    auth: {
        user: process.env.EMAIL_CONFIG_AUTH_USER,
        pass: process.env.EMAIL_CONFIG_AUTH_PASS,
    }
}

const sendOTPEmail = async (userName: string, tempPassword: string) => {
    try {
        const transporter = nodemailer.createTransport(emailConfiguration);
        const mailBody = `
            <b>Your User name: ${userName}</b>
            <br/>
            <b>Your Temporary Password: ${tempPassword}</b>
            <br/>
            Please use this Link to Login: <a href='https://srytal-inc.netlify.app/srytalinc/employee/login'>Login</a>
        `;

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: userName,
            subject: 'Login Details !',
            html: mailBody,
        };

        const result = await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return error;
            }

            console.log('Info after sent:', info.response)
            return info.response;
        });
        return result;
    } catch (error) {
        console.log('Error in sending Email at services: ', error);
        return error;
    }
}

export default { sendOTPEmail }