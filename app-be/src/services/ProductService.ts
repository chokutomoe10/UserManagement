import { Repository } from "typeorm";
import { Product } from '../entities/Product';
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class ProductService {
    private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product);

    async find(req: Request, res: Response) {
        const roleUser = res.locals.loginSession.user.role

        if (roleUser == "customer") {
            return res.status(400).json({ error: "Role required" });
        }

        try {
        const products = await this.productRepository.find(
            {
                order: { id: 'ASC' },
            }
        )
        return res.status(200).json(products)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async findOne(req: Request, res: Response) {
        const roleUser = res.locals.loginSession.user.role

        if (roleUser == "customer") {
            return res.status(400).json({ error: "Role required" });
        }

        const id = parseInt(req.params.id)
        const product = await this.productRepository.findOne({
            where : {id : id},
        })
        return res.status(200).json(product)
    }

    async create(req: Request, res: Response) {
        const data = req.body
        const roleUser = res.locals.loginSession.user.role

        if (roleUser == "customer") {
            return res.status(400).json({ error: "Role required" });
        }

        try {
            const product = this.productRepository.create({
                name: data.name,
                price: data.price,
                status: data.status
            })
            const createdProduct = await this.productRepository.save(product)
            return res.status(200).json(createdProduct)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const roleUser = res.locals.loginSession.user.role

        if (roleUser == "customer") {
            return res.status(400).json({ error: "Role required" });
        }

        const deletedProduct = await this.productRepository.delete(id)
        return res.status(200).json(deletedProduct)
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const data = req.body
        const roleUser = res.locals.loginSession.user.role

        if (roleUser == "customer") {
            return res.status(400).json({ error: "Role required" });
        }

        const product = await this.productRepository.findOne({
            where : {id : id},
        })

        product.name = data.name
        product.price = data.price
        product.status = data.status

        const updatedProduct = await this.productRepository.save(product)
        return res.status(200).json(updatedProduct)
    }
}

export default new ProductService()