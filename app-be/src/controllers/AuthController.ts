import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
    registerCustomer(req: Request, res: Response){
        AuthService.registerCustomer(req,res)
    }

    registerSeller(req: Request, res: Response){
        AuthService.registerSeller(req,res)
    }
    
    login(req: Request, res: Response){
        AuthService.login(req,res)
    }

    check(req: Request, res: Response){
        AuthService.check(req,res)
    }
}

export default new AuthController()