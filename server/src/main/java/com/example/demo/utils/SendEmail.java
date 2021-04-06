package com.example.demo.utils;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

public class SendEmail {

    public static void sendEmail(String to,String body) {
        String result;
        final String subject = "Dini M3ak : Email Confirmation";
        final String messg = body;
        final String from = Constants.EMAIL;
        final String pass = Constants.EMAIL_PASS;
        String host = "smtp.gmail.com";
        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.transport.protocol", "smtp");
        System.setProperty("https.protocols", "TLSv1.1");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.user", from);
        props.put("mail.password", pass);
        props.put("mail.smtp.port", "587");

        Session mailSession = Session.getInstance(props, new javax.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, pass);
            }
        });

        try {
            MimeMessage message = new MimeMessage(mailSession);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(to));
            message.setSubject(subject);
            message.setText(messg);
            Transport.send(message);
            result = "Your mail sent successfully....";
        } catch (MessagingException mex) {
            mex.printStackTrace();
            result = "Error: unable to send mail....";
        }

        System.out.println(result);
    }
}
