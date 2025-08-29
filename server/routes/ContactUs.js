import express from 'express'
import { createMessage } from '../controllers/ContactUs.js'

const ContactRouter = express.Router();

ContactRouter.post('/contact-us',createMessage);

export default ContactRouter;