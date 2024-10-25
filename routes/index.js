const express = require("express")
const router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Configure" })
})

/* GET Remote Set Up page. */
router.get("/set_up_remote", function (req, res, next) {
  res.render("set_up_remote", { title: "Remote Set Up" })
})

/* GET Pair page. */
router.get("/pair", function (req, res, next) {
  res.render("pair", { title: "Pair RemoteASK" })
})

/* GET Settings page. */
router.get("/settings", function (req, res, next) {
  res.render("settings", { title: "Settings" })
})

/* GET Help page. */
router.get("/help", function (req, res, next) {
  res.render("help", { title: "Help" })
})

/* GET About Us page. */
router.get("/about_us", function (req, res, next) {
  res.render("about_us", { title: "About Us" })
})

module.exports = router
