import express from "express"
import CompositionController from "../controller/CompositionController.js"

const router = express.Router()

router.post("/search/description", CompositionController.searchByDescription)
router.post("/search/code", CompositionController.searchByCode)
router.post("/create", CompositionController.create)

export default router