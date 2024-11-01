const express = require("express")
const router = express.Router()
const Roku = require("../support/roku")

router.get("/", async function (req, res, next) {
  const db = req.app.locals.db
  const remoteButtons = await db.get("remoteButtons")
  res.render("remote", { 
    title: "Roku Remote",
    remoteButtons: remoteButtons,
  })
})

router.get("/key/:key", async function (req, res, next) {
  const db = req.app.locals.db
  const rokuDevice = await db.get("rokuDevice")
  const roku = new Roku(rokuDevice.ip)
  await roku.sendKey(req.params.key)

  res.json({ status: "success" })
})

router.get(
  "/launch/:app/:contentId/:mediaType",
  async function (req, res, next) {
    const db = req.app.locals.db
    const rokuDevice = await db.get("rokuDevice")
    const roku = new Roku(rokuDevice.ip)
    await roku.launchApp(
      req.params.app,
      req.params.contentId,
      req.params.mediaType,
    )

    res.json({ status: "success" })
  },
)

module.exports = router
