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

const sendOTPEmail = async (firstName: string, lastName: string, userName: string, tempPassword: string) => {
    try {
        const transporter = nodemailer.createTransport(emailConfiguration);
        const mailBody = `     
            <html>
                <body>
                    <p>Hello <b>${firstName} ${lastName}</b>,</p>
                
                    <p>
                        Below are the credentials to log into the system. Please note that you must
                        change your password after successfully login with your username and
                        temporary password.
                    </p>
                    
                    <p>
                    Click here to <a href="https://srytal-inc.netlify.app/srytalinc/employee/login">Login</a> 
                    or use the link below: <b>https://srytal-inc.netlify.app/srytalinc/employee/login</b>
                    </p>

                    <p><b>Username:</b> ${userName}</p>
                    <p><b>Temporary password:</b> ${tempPassword}</p>

                    <p><b><u>Note:</u></b> Please change your password as soon as possible before it expires !</p>
                    
                    <br/>
                    <p>Regards,</p>
                    <p><b>SRYTAL</b></p>
                </body>
            </html>
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