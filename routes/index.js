const express = require("express")
const router = express.Router()

router.get("/", function (req, res, next) {
  res.render("index", { title: "Configure" })
})

router.get("/help", function (req, res, next) {
  res.render("help", { title: "Help" })
})

router.get("/about_us", function (req, res, next) {
  res.render("about_us", { title: "About Us" })
})

module.exports = router
