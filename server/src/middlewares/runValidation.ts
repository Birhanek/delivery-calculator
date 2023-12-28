import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
export const runValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.status(404).json({
        message:result.array()[0].msg
      })
    }
    return next()
  } catch (error) {
    next(error)
  }
}