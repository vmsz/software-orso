import express from "express"
import cors from "cors"
import database from "./config/database.js"
import compositionRoutes from "./routes/compositionRoutes.js"
import groupingRoutes from "./routes/groupingRoutes.js"
import inputRoutes from "./routes/inputRoutes.js"

const app = express()

app.use(express.json())
app.use(cors())

await database.sync()

app.use("/composition", compositionRoutes)
app.use("/grouping", groupingRoutes)
app.use("/input", inputRoutes)

app.listen(3333)