import express from "express"

const PORT = 3000

const app = express()

app.get("/health", (_req, res) => {
    res.status(200).json({ healthy: true })
})

app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`))