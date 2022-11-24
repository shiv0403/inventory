const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'buster1@ethereal.email',
        pass: '1erKjDx6S3QwXZuuqV'
    }
});

module.exports = {
    sendverificationEmail: async (senderAddress, link) => {
        let error = false;
    
        try{
            await transporter.sendMail({
                from: '"Stock One test Account" <stockoneo@gmail.com>', // sender address
                to: senderAddress, // list of receivers
                subject: "One More click For Your All Shop Needs", // Subject line
                html:`please verify your email by clicking <a href="${link}">here</a> <br/>
                This email will be valid for only 7 days`, // plain text body
                
              });
    
        }catch(e){
            error = true
        }
    
        return error;
        },

        sendForgotPasswordEmail: async (senderAddress, link) => {
            let error = false;
        
            try{
                await transporter.sendMail({
                    from: '"Stock One test Account" <stockoneo@gmail.com>', // sender address
                    to: senderAddress, // list of receivers
                    subject: "Reset your OneStock Password", // Subject line
                    html:`please reset your password by clicking <a href="${link}">here</a> <br/>
                    This email will be valid for only 7 days`, // plain text body
                    
                  });
        
            }catch(e){
                error = true
            }
        
            return error;
            }

    
        
    
    
    }


