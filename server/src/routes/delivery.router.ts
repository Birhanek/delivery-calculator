
import express from 'express'
import deliveryValidator from '../middlewares/delivery.middlewares'
import { deliveryFee } from '../controllers/delivery.controller'
import { runValidationResult } from '../middlewares/runValidation'

const router = express.Router()

router.post('/delivery',deliveryValidator,runValidationResult,deliveryFee)

export default router