import express from "express"
import InputController from "../controller/InputController.js"

const router = express.Router()

router.post("/create", InputController.create)

export default router