import { Repository } from "typeorm";
import { User } from '../entities/User';
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class UserService {
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

    async find(req: Request, res: Response) {
        const roleUser = res.locals.loginSession.user.role

        if (roleUser != "admin") {
            return res.status(400).json({ error: "Role required" });
        }

        try {
        const users = await this.userRepository.find(
            {
                order: { id: 'ASC' },
            }
        )
        return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const roleUser = res.locals.loginSession.user.role

        if (roleUser != "admin") {
            return res.status(400).json({ error: "Role required" });
        }
        
        const user = await this.userRepository.findOne({
            where : {id : id},
        })
        return res.status(200).json(user)
    }

    async createCustomer(req: Request, res: Response) {
        const data = req.body
        const roleUser = res.locals.loginSession.user.role

        if (roleUser != "admin") {
            return res.status(400).json({ error: "Role required" });
        }

        try {
            const customer = this.userRepository.create({
                fullname: data.fullname,
                username: data.username,
                email: data.email,
                role: 'customer'
            })
            const createdCustomer = await this.userRepository.save(customer)
            return res.status(200).json(createdCustomer)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
    
    async createSeller(req: Request, res: Response) {
        const data = req.body
        const roleUser = res.locals.loginSession.user.role

        if (roleUser != "admin") {
            return res.status(400).json({ error: "Role required" });
        }

        try {
            const seller = this.userRepository.create({
                fullname: data.fullname,
                username: data.username,
                email: data.email,
                role: 'seller'
            })
            const createdSeller = await this.userRepository.save(seller)
            return res.status(200).json(createdSeller)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async delete(req: Request, res: Response) {
        const roleUser = res.locals.loginSession.user.role

        if (roleUser != "admin") {
            return res.status(400).json({ error: "Role required" });
        }

        const id = parseInt(req.params.id)
        const deletedUser = await this.userRepository.delete(id)
        return res.status(200).json(deletedUser)
    }

    async update(req: Request, res: Response) {
        const roleUser = res.locals.loginSession.user.role

        if (roleUser != "admin") {
            return res.status(400).json({ error: "Role required" });
        }

        const id = parseInt(req.params.id)
        const data = req.body
        const user = await this.userRepository.findOne({
            where : {id : id},
        })

        user.fullname = data.fullname
        user.username = data.username
        user.email = data.email

        const updatedUser = await this.userRepository.save(user)
        return res.status(200).json(updatedUser)
    }
}

export default new UserService()