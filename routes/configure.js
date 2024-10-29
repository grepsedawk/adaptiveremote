const express = require("express")
const router = express.Router()
const dgram = require("dgram")
const Roku = require("../support/roku")

router.get("/", async function (req, res, next) {
  res.render("configure", {
    title: "Configure",
    rokuDevices: await Roku.listDevices(),
  })
})

router.get("/roku", async function (req, res, next) {
  res.render("roku", {
    title: "Configure Roku",
    rokuDevices: await Roku.listDevices(),
  })
})

router.get("/:ip/:mac", async function (req, res, next) {
  req.app.locals.db.set("rokuDevice", {
    ip: req.params.ip,
    mac: req.params.mac,
  })
  res.redirect("/configure")
})

module.exports = router
