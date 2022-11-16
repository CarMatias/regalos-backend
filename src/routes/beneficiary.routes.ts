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
  console.log(name, apellido);
  const newB = await beneficiaryService.newBeneficiary(name, apellido);
  if (newB != null) {
    res.send("Se agrego correctamente!");
  }
});

router.get("/getbeneficiary", cors(corsOptions), async (req, res) => {
  const id_user = req.body.id_beneficiary;
  const result = await beneficiaryService.getBeneficiarys();
  res.send(result);
  console.log(result);
});

export default router;
