const express = require("express")
const router = express.Router()
const dgram = require("dgram")
const Roku = require("../support/roku")

router.get("/", async function (req, res, next) {
  res.render("roku", {
    title: "Configure Roku",
    rokuDevices: await Roku.listDevices(),
  })
})

module.exports = router
