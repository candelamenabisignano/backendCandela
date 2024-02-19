import { createHash, generateToken, isValid } from "../utils/utils.js";
import {
  getUsersService,
  getUserByEmailService,
  getUserByIdService,
  registerService,
  uptadeService
} from "../services/users.service.js";
import nodemailer from 'nodemailer';

const transporter= nodemailer.createTransport({
  service:'gmail',
  port:587,
  auth:{
    user:'candelamenabisignano07@gmail.com',
    pass:'kdtnvoyxbyjarwnq'
  }
})

const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    res.send({ status: "success", payload: users });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, cart, role } = req.body;
    const user = await getUserByEmailService(email);
    req.logger.info(user)
    if (user != null) {
      req.logger.error("an user has already registered with this email")
      return res
        .status(400)
        .send({
          status: "error",
          error: "an user has already registered with this email",
        });
    }
    if (
      !first_name ||
      !last_name ||
      !email ||
      !age ||
      !password ||
      !cart
    ) {
      req.logger.error('campus incomplete')
      return res
        .status(400)
        .send({ status: "error", error: "campus incomplete" });
    }  
    const userToUptade={
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
      password: createHash(password),
      cart: cart,
      role: role,
      documents:[]
    };
    const userUptaded=await registerService(userToUptade);
    req.logger.info('pasamos registro')
    return res
      .status(201)
      .send({
        status: "success",
        message: "user registered",
        payload:userUptaded});
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmailService(email);
    req.logger.info(user);
    req.logger.info(password);

    if ((user == null) || (user == undefined)) {
      req.logger.error('invalid credentials')
      return res.status(405).send({ status: "error", error: "invalid credentials" });
    };

    if(isValid(password, user.password) === false){
      req.logger.error('invalid credentials')
      return res.status(401).send({ status: "error", error: "invalid credentials" });
    }

    const userToUptade={...user, last_connection: new Date().toLocaleString()};

    const userUptaded= await uptadeService(user._id, userToUptade);
    req.logger.info(userUptaded);
    const { password: _, ...userToken } = userUptaded;

    const token = generateToken(userToken);

    return res
      .cookie("tokenCookie", token, { maxAge: 100 * 100 * 100, httpOnly: true }).status(201).send({ status: "success", payload: userUptaded});
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const uptadePassword=async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user=await getUserByEmailService(email);
    if(!user){
      req.logger.error('invalid credentials')
      return res.status(401).send({ status: "error", error: "invalid credentials" });
    };
    if(isValid(password, user.password)){
      req.logger.error("Unfortunately, the modification of your password cannot be facilitated at this time due to its retention as the current password")
      return res.status(403).send({status:'error', error:"Unfortunately, the modification of your password cannot be facilitated at this time due to its retention as the current password"})
    }
    const hashedPassword=createHash(password);
    const id=user._id ?? user.id;
    const userToUptade={...user, password:hashedPassword};
    const newUser=await uptadeService(id, userToUptade);
    return res.send({status:'success', payload:newUser});
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const passwordLink=async(req,res)=>{
  const email= req.query.email;
  try {
    const user= await getUserByEmailService(email);

    if(user === null ||user === undefined){
      req.logger.error('user not found')
      return res.status(404).send({status:'error', error:'user not found'});
    };

    const token= generateToken({email:user.email, password:user.password});

    await transporter.sendMail({
      from: 'Candela Mena e-commerce',
      to: email,
      subject:'recuperar contraseña e-commerce Candela Mena',
      html:`
      <h2>recuperacion de password accede al siguiente link<h2/>
      <a href="http://localhost:8080/reset-password?token=${token}">http://localhost:8080/reset-password?token=${token}<a/>
      `,
      attachments:[]
    });

    return res.send({status:'success', payload:token});

  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const current = (req, res) => {
  try {
    if (req.user === (undefined || null)) {
      req.logger.error('user not found')
      return res.status(400).send({ status: "error", error: "user not found" });
    }
    return res.send({ status: "success", payload: req.user});
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const github = (req, res) => {
  res.status(201).send({ status: "success", message: "user registered" });
};

const githubCallBack = (req, res) => {
  req.user = req.user;
  res.redirect("/products");
};

const logout = async (req, res) => {
  try {
    const cookie = req.cookies["tokenCookie"];
    if (!cookie) {
      req.logger.error('cookie not found')
      return res
        .status(400)
        .send({ status: "error", error: "cookie not found" });
    }
    const userToUptade={...req.user, last_connection: new Date().toLocaleString()};
    await uptadeService(req.user._id, userToUptade);
    req.user = null;
    res.clearCookie("tokenCookie");
    res.redirect("/products");
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export { getUsers, register, login, current, github, githubCallBack, logout, passwordLink, uptadePassword };
