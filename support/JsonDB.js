const fs = require("fs").promises
const path = require("path")

class JsonDB {
  constructor(filePath) {
    this.filePath = path.resolve(filePath)
  }

  async load() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8")
      return JSON.parse(data)
    } catch (err) {
      if (err.code === "ENOENT") {
        return {}
      } else {
        throw err
      }
    }
  }

  async save(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2))
    } catch (err) {
      throw new Error("Error saving data to the file")
    }
  }

  async getAll() {
    return await this.load()
  }

  async get(key) {
    const data = await this.load()
    return data[key] || null
  }

  async set(key, value) {
    const data = await this.load()
    data[key] = value
    await this.save(data)
  }

  async delete(key) {
    const data = await this.load()
    if (key in data) {
      delete data[key]
      await this.save(data)
    } else {
      throw new Error(`Key "${key}" not found in database`)
    }
  }
}

module.exports = JsonDB
