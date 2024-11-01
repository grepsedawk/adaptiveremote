const express = require("express")
const router = express.Router()
const dgram = require("dgram")
const Roku = require("../support/roku")

router.get("/", async function (req, res, next) {
  res.render("configure", {
    title: "Configure"
  })
})

router.get("/roku", async function (req, res, next) {
  res.render("roku", {
    title: "Configure Roku",
    rokuDevices: await Roku.listDevices(),
  })
})

router.get("/remote", async function (req, res, next) {
  const db = req.app.locals.db
  res.render("configureRemote", {
    title: "Remote",
    remoteButtons: await db.get("remoteButtons")
  })
})

router.post("/remote", async function (req, res, next) {
  const db = req.app.locals.db
  const remoteButtons = Object.keys(req.body).filter((key) => key.includes("appId")).map((key) => {
    const index = key.match(/\[(\d+)\]/)[1]
    return {
      appId: req.body[`items[${index}][appId]`],
      contentId: req.body[`items[${index}][contentId]`],
      mediaType: req.body[`items[${index}][mediaType]`],
    }
  })
  db.set("remoteButtons", remoteButtons)
  res.redirect("/configure")
})

router.get("/:ip/:mac", async function (req, res, next) {
  req.app.locals.db.set("rokuDevice", {
    ip: req.params.ip,
    mac: req.params.mac,
  })
  res.redirect("/configure")
})

module.exports = router
