import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
    }
    async sendMail(to: string, subject: string, text: string) {
        return this.transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text
        });
    }
}