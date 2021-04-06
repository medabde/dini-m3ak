package com.example.demo.utils;

import com.example.demo.model.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Component
public class Utils {

    @Autowired
    private UserRepository userRepository;

    public boolean checkRole(long userId, String role){
        User user = userRepository.getOne(userId);
        return user.getRole().getRole().equals(role);
    }

    public static void sendEmail(String to,String body) {
        String result;

        Properties props = new Properties();
        props.put("mail.smtp.host", Constants.HOST);
        props.put("mail.transport.protocol", Constants.MAIL_PROTOCOL);
        System.setProperty("https.protocols", Constants.HTTPS_PROTOCOL);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.user", Constants.EMAIL);
        props.put("mail.password", Constants.EMAIL_PASS);
        props.put("mail.smtp.port",Constants.PORT);

        Session mailSession = Session.getInstance(props, new javax.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(Constants.EMAIL, Constants.EMAIL_PASS);
            }
        });

        try {
            MimeMessage message = new MimeMessage(mailSession);
            message.setFrom(new InternetAddress(Constants.EMAIL));
            message.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(to));
            message.setSubject(Constants.CONFIRMATION_EMAIL_SUBJECT);
            message.setText(body);
            Transport.send(message);
            result = "Your mail sent successfully....";
        } catch (MessagingException mex) {
            mex.printStackTrace();
            result = "Error: unable to send mail....";
        }

        System.out.println(result);
    }



}
