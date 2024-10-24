const dgram = require("dgram")
const jsdom = require("jsdom")

class Roku {
  constructor(address, mac) {
    this.address = address
    this.mac = mac
  }

  static listDevices() {
    return new Promise((resolve, reject) => {
      resolve([
        {
          ip: "127.0.0.1",
          mac: "00:00:00:00:00:00",
          friendlyName: "RokuMock",
        }
      ])
    })
  }

  sendKey(key) {
    console.log("[RokuMock] Sending key:", key)
  }

  launchApp(appId, contentId, mediaType) {
    console.log("[RokuMock] Launching app:", appId, contentId, mediaType)
  }
}

module.exports = Roku
