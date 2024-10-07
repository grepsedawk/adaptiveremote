const dgram = require("dgram")

class Roku {
  constructor(address) {
    this.address = address
  }

  static listDevices() {
    return new Promise((resolve, reject) => {
      const socket = dgram.createSocket("udp4")

      const ssdpMessage = Buffer.from(
        "M-SEARCH * HTTP/1.1\r\n" +
          "HOST: 239.255.255.250:1900\r\n" +
          'MAN: "ssdp:discover"\r\n' +
          "MX: 3\r\n" +
          "ST: roku:ecp\r\n" +
          "\r\n",
      )

      const rokuDevices = []

      function discoverRokuDevices() {
        socket.send(
          ssdpMessage,
          0,
          ssdpMessage.length,
          1900,
          "239.255.255.250",
          (err) => {
            if (err) {
              console.error("Error sending SSDP request", err)
              socket.close()
              reject(err)
            } else {
              console.log("Sent SSDP request for Roku devices...")
            }
          },
        )
      }

      socket.on("message", (msg, rinfo) => {
        const message = msg.toString()
        if (message.includes("roku:ecp")) {
          rokuDevices.push({
            address: rinfo.address,
            message: message,
          })
        }
      })

      socket.on("error", (err) => {
        console.error("[Roku] Socket error:", err)
        socket.close()
        reject(err)
      })

      socket.bind(() => {
        discoverRokuDevices()
        setTimeout(() => {
          socket.close()
          resolve(rokuDevices)
        }, 7000)
      })
    })
  }

  sendKey(key) {
    fetch(`http://${this.address}:8060/keypress/${key}`, {
      method: "POST",
    })
  }

  launchApp(appId, contentId, mediaType) {
    fetch(`http://${this.address}:8060/launch/${appId}?contentID=${contentId}&mediaType=${mediaType}`, {
      method: "POST",
    })
  }
}

module.exports = Roku
