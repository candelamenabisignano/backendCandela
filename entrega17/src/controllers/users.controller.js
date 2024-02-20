import {
  getUserByIdService,
  uptadeService,
} from "../services/users.service.js";

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
    if ((user.role === "user") && (user.status === "complete")) {
      user.role = "premium";
      newUser = await uptadeService(id, user);
    } else if((user.role === "premium")){
      user.role = "user";
      newUser = await uptadeService(id, user);
    }else{
      return res
      .status(401)
      .send({ status: "error", error: "this user role cannot be changed because of its status" });
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

    const statusDocs=['identificacion', 'comprobante_de_domicilio', 'comprobante_de_estado_de_cuenta'];
    let alreadySeen=[]
    user.documents.forEach((doc)=>{
      statusDocs.includes(doc.name.split("-")[1].split(".")[0]) ? alreadySeen.push(doc.name.split("-")[1].split(".")[0]) : null;
    });
    if(statusDocs.every((name)=> alreadySeen.includes(name))){
      user.status="complete"
    }else{
      user.status="incomplete"
    }
    await uptadeService(id, user);
    const finalUser = await getUserByIdService(id);
    return res.send({ status: "success", payload: finalUser });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export { uptadeRole, uploadFiles };
