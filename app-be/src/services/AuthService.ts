import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { loginSchema, registerSchema } from "../utils/validators/user";
import * as jwt from "jsonwebtoken"

class AuthService {
    private readonly authRepository: Repository<User> = AppDataSource.getRepository(User);

    async registerCustomer(req: Request, res: Response) {
        try {
            const data = req.body
            const {error, value} = registerSchema.validate(data)

            if (error) {
                return res.status(400).json({ error: error})
            }

            const hashPassword = await bcrypt.hash(data.password, 10)

            const checkEmail = await this.authRepository.count({
                where: {
                    email: value.email,
                    username: value.username
                }
            });

            if (checkEmail > 0) {
                return res.status(400).json("email/username sudah ada")
            }

            const user = this.authRepository.create({
                fullname: data.fullname,
                username: data.username,
                email: data.email,
                password: hashPassword,
                role: "customer"
            })
            
            const createdUser = await this.authRepository.save(user)
            return res.status(200).json(createdUser)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async registerSeller(req: Request, res: Response) {
        try {
            const data = req.body

            const {error, value} = registerSchema.validate(data)
            if (error) {
                return res.status(400).json({ error: error})
            }

            const hashPassword = await bcrypt.hash(data.password, 10)

            const checkEmail = await this.authRepository.count({
                where: {
                    email: value.email,
                    username: value.username
                }
            });

            if (checkEmail > 0) {
                return res.status(400).json("email/username sudah ada")
            }

            const user = this.authRepository.create({
                fullname: data.fullname,
                username: data.username,
                email: data.email,
                password: hashPassword,
                role: "seller"
            })
            
            const createdUser = await this.authRepository.save(user)
            return res.status(200).json(createdUser)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = req.body
            const { error, value } = loginSchema.validate(data)

            if (error) {
                return res.status(400).json({ error:error })
            }

            const checkEmail = await this.authRepository.findOne({
                where: {
                    email: value.email,
                    username: value.username
                },
                select: ["id", "fullname", "username", "email", "password", "role"],
            })

            if (!checkEmail) {
                return res.status(400).json("email/password salah")
            }

            const isPasswordValid = await bcrypt.compare(
                value.password,
                checkEmail.password
            )

            if (!isPasswordValid) {
                return res.status(400).json({
                    error: "password salah!",
                })
            }

            const user = this.authRepository.create({
                id: checkEmail.id,
                fullname: checkEmail.fullname,
                username: checkEmail.username,
                email: checkEmail.email,
                role: checkEmail.role
            })

            const token = jwt.sign({ user }, "appsecret", { expiresIn: "24h"})

            return res.status(200).json({
                user: user,
                token
            })
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async check(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession

            const user = await this.authRepository.findOne({
                where: {
                    id: loginSession.user.id,
                },
                select: ["id", "fullname", "username", "email", "password", "role"],
            })

            return res.status(200).json({
                user,
                message: "Token is valid",
            })
        } catch (error) {
            return res.status(500).json("Server Error")
        }
    }
}

export default new AuthService()