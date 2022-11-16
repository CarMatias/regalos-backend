import bodyParser from "body-parser";
import { Router } from "express";
import beneficiaryService from "../services/beneficiaryService";

const router = Router();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/newbeneficiary", cors(corsOptions), async (req, res) => {
  const name = req.body.name;
  const apellido = req.body.apellido;
  const id_user = req.body.id_user
  console.log(name, apellido, id_user);
  const newB = await beneficiaryService.newBeneficiary(name, apellido,id_user);
  if (newB != null) {
    res.send("Se agrego correctamente!");
  }
});

router.post("/getbeneficiary", cors(corsOptions), async (req, res) => {
  const id_user = req.body.id_user;
  console.log(id_user)
  const result = await beneficiaryService.getBeneficiarys(id_user);
  res.send(result);
});

export default router;
