import { mailtrapClient, sender } from "../config/mailtrap-config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplate.js";


export const sendVerificationEmail = async(email, verificationToken)=>{
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Please verify your account",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email sent successfully", response);
    } catch (error) {
        console.log(`Failed to send email: ${error.message}`);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}



export const sendWelcomeEmail = async(email, username)=>{
    const recipient = [{email}]
    
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid:"9a293ced-12ba-4bd4-8dbe-93cb6fd1a562",
            template_variables:{
                "name": username,
                "company_info_name": "Spotify"
            }
        })

        console.log("Welcome Email sent  successfully", response);
    }
    catch(error){
        console.log(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error.message}`);
    }
}