

import express from "express";
const router = express.Router()

import { loginHandler, registerHandler, tokenHandler } from '../controllers/authController.js'

router.post('/register', registerHandler)
router.post('/login', loginHandler)
router.get('/login', tokenHandler)


export default router