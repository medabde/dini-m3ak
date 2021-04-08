package com.example.demo.controller;

import com.example.demo.exception.AuthException;
import com.example.demo.exception.BadRequestException;
import com.example.demo.model.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.Constants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.*;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("app/auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> loginUser(@RequestBody Map<String, Object> userMap){
        String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        int role = (int) userMap.get("role");

        User user;

        try{
            user = userRepository.findByEmailAndRole(email,roleRepository.getOne((long) role));
            if(user == null || !BCrypt.checkpw(password,user.getPassword())){
                throw new AuthException("Invalid email/password");
            }

        }catch (Exception e){
            throw new AuthException("Invalid email/password");
        }



        return new ResponseEntity<>(generateJWTToken(user), HttpStatus.OK);

    }

    @PostMapping("/register")
    public ResponseEntity<Map<String,String>> registerUser(@RequestBody Map<String,Object> userMap){
        String fName = (String) userMap.get("fname");
        String lName = (String) userMap.get("lname");
        String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        int role = (int) userMap.get("role");

        Pattern pattern = Pattern.compile(Constants.EMAIL_FORMAT);
        if(email!=null) email = email.toLowerCase();
        if(!pattern.matcher(email).matches()){
            throw new AuthException("Invalid email format");
        }

        int count = userRepository.getCountByEmail(email);
        if (count>0) throw new AuthException("Email already in use");

        String cryptedPass = BCrypt.hashpw(password,BCrypt.gensalt(Constants.ROUNDS));

        User user = new User();
        user.setFirst_name(fName);
        user.setLast_name(lName);
        user.setEmail(email);
        user.setPassword(cryptedPass);
        user.setToken(generateConfirmationToken());
        user.setEnabled(false);
        user.setRole(roleRepository.getOne((long) role));

        user = userRepository.save(user);

        sendEmail(user.getEmail(),
                "Hello "+user.getFirst_name()+" "+user.getLast_name()
                        +",\nThank you for joining us , Please confirm your email by clicking the link below : \n\n"
                        +"http://localhost:8081/app/auth/confirm/"+user.getToken());

        return new ResponseEntity<>(generateJWTToken(user), HttpStatus.OK);
    }

    @GetMapping("/confirm/{token}")
    public String confirmUser(@PathVariable String token){

        User user = userRepository.findByToken(token);
        if(user == null) throw new BadRequestException("Please check that you have the right link for confirming your email and try again.");
        if(user.isEnabled()) throw new BadRequestException("Email already Confirmed");

        user.setEnabled(true);
        userRepository.save(user);
        return "Thank you "+ user.getFirst_name() +" "+user.getLast_name()
                +"<br>for confirming your email, now you can login to our website and enjoy our services.<br>Happy travelling :D"
                +"<br><a href='http://localhost:4200/login'>Login Page</a>";

    }


    private Map<String,String> generateJWTToken(User user){
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constants.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp+ Constants.TOKEN_VALIDITY))
                .claim("userId",user.getId_user())
                .claim("email",user.getEmail())
                .claim("first_name",user.getFirst_name())
                .claim("last_name",user.getLast_name())
                .claim("cin",user.getCIN())
                .claim("address",user.getAddress())
                .claim("phone",user.getPhone())
                .claim("is_enabled",user.isEnabled())
                .claim("is_admin",user.getRole().getRole().equals(Constants.ADMIN_ROLE))
                .compact();
        Map<String,String> map = new HashMap<>();
        map.put("token",token);
        return map;
    }

    private String generateConfirmationToken(){
        int leftLimit = 97;
        int rightLimit = 122;
        int targetStringLength = 10;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);
        for (int i = 0; i < targetStringLength; i++) {
            int randomLimitedInt = leftLimit + (int)
                    (random.nextFloat() * (rightLimit - leftLimit + 1));
            buffer.append((char) randomLimitedInt);
        }

        return buffer.toString();
    }

    public void sendEmail(String to,String body) {
        String result;

        Properties props = new Properties();
        props.put("mail.smtp.host", Constants.HOST);
        props.put("mail.transport.protocol", Constants.MAIL_PROTOCOL);
        System.setProperty("https.protocols", Constants.HTTPS_PROTOCOL);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.user", Constants.EMAIL);
        props.put("mail.password", Constants.EMAIL_PASS);
        props.put("mail.smtp.port", Constants.PORT);

        Session mailSession = Session.getInstance(props, new Authenticator() {
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
