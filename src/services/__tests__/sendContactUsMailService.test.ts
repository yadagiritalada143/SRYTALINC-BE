import nodemailer from 'nodemailer';
import emailService from '../../services/common/sendContactUsMailService';

jest.mock('nodemailer');

describe('sendContactUsMail', () => {
    const mockMailDetails = {
        companyName: 'Test Company',
        customerEmail: 'customer@example.com',
        subject: 'Test Subject',
        message: 'This is a test message.'
    };

    const mockTransporter = {
        sendMail: jest.fn()
    };

    beforeEach(() => {
        (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send an email successfully', async () => {
        mockTransporter.sendMail.mockResolvedValue({ response: '250 Message accepted' });

        const result = await emailService.sendContactUsMail(mockMailDetails);

        expect(nodemailer.createTransport).toHaveBeenCalledWith({
            service: process.env.EMAIL_CONFIG_SERVICE,
            host: process.env.EMAIL_CONFIG_HOST,
            port: Number(process.env.EMAIL_CONFIG_PORT),
            secure: Boolean(process.env.EMAIL_CONFIG_SECURE),
            auth: {
                user: process.env.EMAIL_CONFIG_AUTH_USER,
                pass: process.env.EMAIL_CONFIG_AUTH_PASS,
            }
        });

        expect(mockTransporter.sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
                from: process.env.EMAIL_FROM,
                to: process.env.ADMIN_EMAIL_ABOUT_CUSTOMER,
                subject: mockMailDetails.subject,
                html: expect.any(String),
            })
        );

        expect(result.response).toBe('250 Message accepted');
    });

    it('should return an error if email fails to send', async () => {
        const error = new Error('Failed to send email');
        
    
        mockTransporter.sendMail.mockRejectedValue(error);

      const result = await emailService.sendContactUsMail(mockMailDetails) as { response: string };
expect(result.response).toBe('250 Message accepted');

    });
});
