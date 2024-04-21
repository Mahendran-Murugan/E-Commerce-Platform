const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.get("/get/:id", async (req, res) => {
  const params = req.params.id;
  const product = [];
  await axios
    .get(`${process.env.SERVER_URL}/Electronics/get/${params}`)
    .then((r) =>
      r.data.length != 0
        ? product.push({ category: "Electronics", data: r.data })
        : false
    );
  await axios
    .get(`${process.env.SERVER_URL}/Jewels/get/${params}`)
    .then((r) =>
      r.data.length != 0
        ? product.push({ category: "Jewels", data: r.data })
        : false
    );
  await axios
    .get(`${process.env.SERVER_URL}/Clothing/get/${params}`)
    .then((r) =>
      r.data.length != 0
        ? product.push({ category: "Clothing", data: r.data })
        : false
    );

  res.status(200).json(product[0]);
});

module.exports = router;
