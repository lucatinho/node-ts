import sgMail, { MailDataRequired } from "@sendgrid/mail";


// interface IMailTo {
//     name: string;
//     email: string;
// }

// interface IMailMessage {
//     subject: string;
//     body: string;
//     attachment?: Array<string>;
// }

// interface IMessageDTO {
//     to: IMailTo;
//     message: IMailMessage;
// }

// class EmailService2 {
//     sendMail({to, message}: IMessageDTO) {
//         console.log(`Email enviado ${to.name}: ${message.subject}`);
//     }
// }


class EmailService {
    sendMail_forgot_password(email: string, token: string): MailDataRequired {
        sgMail.setApiKey('');

        return {
            to: email, // Change to your recipient
            from: 'bancodealunos@gmail.com', // Change to your verified sender
            subject: 'Vibranium - Recuperação de senha!',
            text: 'Recover Password',
            html: `<a href="https://vibranium.parcas.com.br/reset-password/${token}">Clique aqui para trocar sua senha</a>`,
        }
    }
}

export default EmailService;
