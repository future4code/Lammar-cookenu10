import express from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserController } from '../controller/UserController'
import { UserData } from '../data/UserData'

export const userRouter = express.Router()

const userData = new UserData()
const userBusiness = new UserBusiness(userData)
const userController = new UserController(userBusiness)

userRouter.get("/feed", (req, res) => userController.getFeed(req, res))
userRouter.get("/profile", (req, res) => userController.getUserProfile(req, res))
userRouter.get("/:id", (req, res) => userController.getAnotherUserProfile(req, res))
userRouter.post("/signup", (req, res) => userController.signUp(req, res))
userRouter.post("/login", (req, res) => userController.login(req, res))
userRouter.post("/follow", (req, res) => userController.followUser(req, res))
userRouter.delete("/unfollow", (req, res) => userController.unfollowUser(req, res))
userRouter.delete("/delete", (req, res) => userController.deleteAccount(req, res))