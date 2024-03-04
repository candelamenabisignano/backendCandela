import {
  getUserByIdService,
  uptadeUserService,
  getUsersService,
  deleteUserService,
  getUserByEmailService,
} from "../services/users.service.js";
import { calculateDate, transporter, generateToken } from "../utils/utils.js";
const getUsers = async (req, res) => {
  try {
    let users = await getUsersService();
    users.forEach((u, i, array) => {
      array[i] = {
        name: u.name ?? `${u.first_name} ${u.last_name}`,
        email: u.email,
        role: u.role ?? "user",
      };
    });
    return res.send({ status: "success", payload: users });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteUserService(id);
    const newUsers = await getUsersService();
    return res.send({ status: "success", payload: newUsers });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
const deleteUsers = async (req, res) => {
  try {
    let users = await getUsersService();
    users.forEach(async (u) => {
      const fechaActual = new Date();
      const diferencia = calculateDate(fechaActual, u.last_connection);
      if (diferencia < 2) return;
      else await deleteUserService(u._id ?? u.id);
    });
    const newUsers = await getUsersService();
    res.send({ status: "success", payload: newUsers });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
const passwordLink = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await getUserByEmailService(email);
    if (user === null || user === undefined) {
      req.logger.error("user not found");
      return res.status(404).send({ status: "error", error: "user not found" });
    }
    const token = generateToken({ email: user.email, password: user.password });
    await transporter.sendMail({
      from: "Candela Mena e-commerce",
      to: email,
      subject: "recuperar contraseña e-commerce Candela Mena",
      html: `
      <h2>recuperacion de password accede al siguiente link<h2/>
      <a href="http://localhost:8080/reset-password?token=${token}">http://localhost:8080/reset-password?token=${token}<a/>
      `,
      attachments: [],
    });
    return res.send({ status: "success", payload: token });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
const uptadeRole = async (req, res) => {
  const id = req.params.uid;
  try {
    let user = await getUserByIdService(id);
    if (user === null || user === undefined) {
      req.logger.error("user not found");
      return res.status(404).send({ status: "error", error: "user not found" });
    }
    if (user.role === "admin") {
      req.logger.error("this user role cannot be changed");
      return res
        .status(401)
        .send({ status: "error", error: "this user role cannot be changed" });
    }
    let newUser;
    if (user.role === "user" && user.status === "complete") {
      user.role = "premium";
      newUser = await uptadeUserService(id, user);
    } else if (user.role === "premium") {
      user.role = "user";
      newUser = await uptadeUserService(id, user);
    } else {
      return res
        .status(401)
        .send({
          status: "error",
          error:
            "this user role cannot be changed because of its incomplete status",
        });
    }
    return res.send({ status: "success", payload: newUser });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
const uploadFiles = async (req, res) => {
  const id = req.params.uid;
  try {
    const files = await req.files;
    let user = req.user;
    Object.values(files).forEach((fieldname) => {
      fieldname.forEach((file) => {
        const fileObject = { name: file.filename, reference: file.path };
        user.documents.push(fileObject);
      });
    });
    const statusDocs = [
      "identificacion",
      "comprobante_de_domicilio",
      "comprobante_de_estado_de_cuenta",
    ];
    let alreadySeen = [];
    user.documents.forEach((doc) => {
      statusDocs.includes(doc.name.split("-")[1].split(".")[0])
        ? alreadySeen.push(doc.name.split("-")[1].split(".")[0])
        : null;
    });
    if (statusDocs.every((name) => alreadySeen.includes(name))) {
      user.status = "complete";
    } else {
      user.status = "incomplete";
    }
    await uptadeUserService(id, user);
    const finalUser = await getUserByIdService(id);
    return res.send({ status: "success", payload: finalUser });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
export {
  getUsers,
  deleteUsers,
  uptadeRole,
  uploadFiles,
  deleteUser,
  passwordLink,
};
