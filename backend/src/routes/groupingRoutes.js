import express from "express"
import GroupingController from "../controller/GroupingController.js"

const router = express.Router()

router.post("/get", GroupingController.get)
router.post("/create", GroupingController.create)

export default router