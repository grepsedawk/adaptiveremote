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

// default buttons:
//         button.movie1(onclick="fetch('/remote/launch/12/70176514/series')") Naruto
        // button.movie2(onclick="fetch('/remote/launch/12/80180046/series')") Grey's
        // button.movie3(onclick="fetch('/remote/launch/291097/622e6dbd-79d2-49ec-b2f5-2a46a29bd57d/series')") Cheetah

router.get("/remote", async function (req, res, next) {
  const db = req.app.locals.db
  const buttonDefaults = [
    {
      title: "Naruto",
      appId: 12,
      contentId: "70176514",
      mediaType: "series",
    },
    {
      title: "Grey's Anatomy",
      appId: 12,
      contentId: "80180046",
      mediaType: "series",
    },
    {
      title: "Cheetah",
      appId: 291097,
      contentId: "622e6dbd-79d2-49ec-b2f5-2a46a29bd57d",
      mediaType: "movie",
    },
  ]

  res.render("configureRemote", {
    title: "Remote",
    remoteButtons: await db.get("remoteButtons") || buttonDefaults
  })
})

router.post("/remote", async function (req, res, next) {
  const db = req.app.locals.db
  const remoteButtons = Object.keys(req.body).filter((key) => key.includes("appId")).map((key) => {
    const index = key.match(/\[(\d+)\]/)[1]
    return {
      title: req.body[`items[${index}][title]`],
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
