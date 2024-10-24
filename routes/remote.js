const express = require("express")
const router = express.Router()
const Roku = require("../support/roku")

router.get("/", async function (req, res, next) {
  res.render("remote", { title: "Roku Remote" })
  // TODO: remove keypress on get page load
  const roku = new Roku("10.0.0.141")
})

router.get("/key/:key", async function (req, res, next) {
  const roku = new Roku("10.0.0.141")
  await roku.sendKey(req.params.key)

  res.json({ status: "success" })
})

router.get(
  "/launch/:app/:contentId/:mediaType",
  async function (req, res, next) {
    const roku = new Roku("10.0.0.141")
    await roku.launchApp(
      req.params.app,
      req.params.contentId,
      req.params.mediaType,
    )

    res.json({ status: "success" })
  },
)

module.exports = router
