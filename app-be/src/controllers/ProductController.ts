import { Request, Response } from 'express'
import ProductService from '../services/ProductService'

class ProductController {
    find(req: Request, res: Response){
        ProductService.find(req, res)
    }

    findOne(req: Request, res: Response){
        ProductService.findOne(req, res)
    }

    create(req: Request, res: Response){
        ProductService.create(req, res)
    }

    delete(req: Request, res: Response){
        ProductService.delete(req, res)
    }

    update(req: Request, res: Response){
        ProductService.update(req, res)
    }
}

export default new ProductController()