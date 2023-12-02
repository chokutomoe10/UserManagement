import * as express from 'express'
import UserController from '../controllers/UserController'
import ProductController from '../controllers/ProductController'
import AuthController from '../controllers/AuthController'
import authenticate from '../middlewares/auth'

const router = express.Router()

//auth
router.post("/auth/registerCustomer", AuthController.registerCustomer)
router.post("/auth/registerSeller", AuthController.registerSeller)
router.post("/auth/login", AuthController.login)
router.get("/auth/check", authenticate, AuthController.check)

//product
router.get("/products", authenticate, ProductController.find)
router.get("/product/:id", authenticate, ProductController.findOne)
router.post("/product", authenticate, ProductController.create)
router.patch("/product/:id", authenticate, ProductController.update)
router.delete("/product/:id", authenticate, ProductController.delete)

//user
router.get("/users", authenticate, UserController.find)
router.get("/user/:id", authenticate, UserController.findOne)
router.post("/customer", authenticate, UserController.createCustomer)
router.post("/seller", authenticate, UserController.createSeller)
router.patch("/user/:id", authenticate, UserController.update)
router.delete("/user/:id", authenticate, UserController.delete)

export default router