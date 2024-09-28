"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const emailConfiguration = {
    service: process.env.EMAIL_CONFIG_SERVICE,
    host: process.env.EMAIL_CONFIG_HOST,
    port: Number(process.env.EMAIL_CONFIG_PORT),
    secure: Boolean(process.env.EMAIL_CONFIG_SECURE),
    auth: {
        user: process.env.EMAIL_CONFIG_AUTH_USER,
        pass: process.env.EMAIL_CONFIG_AUTH_PASS,
    }
};
const sendOTPEmail = (firstName, lastName, userName, tempPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport(emailConfiguration);
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
        const result = yield transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return error;
            }
            console.log('Info after sent:', info.response);
            return info.response;
        });
        return result;
    }
    catch (error) {
        console.log('Error in sending Email at services: ', error);
        return error;
    }
});
exports.default = { sendOTPEmail };
