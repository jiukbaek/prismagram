import { adjective, nouns } from "./word";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generatorSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjective.length);
  return `${adjective[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    service: "naver",
    auth: {
      user: "jiuk205@naver.com",
      pass: "poeing9402"
    }
  };
  const mailer = nodemailer.createTransport(options);
  return mailer.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "jiuk205@naver.com",
    to: address,
    subject: "Login Secret for Prismagram",
    html: `Hello! Your login Secret it <br/><b style="font-size:18px;">${secret}</b><br/> Copy paste on the Prismagram to login`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
