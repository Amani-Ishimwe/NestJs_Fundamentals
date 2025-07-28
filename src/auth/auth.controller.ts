import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private authService:AuthService){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req,@Response() res){
        try{
        const accessToken = this.authService.login(req.user)
        return res.status(200).json(accessToken)
        }catch (err){
        return res.status(403)
        }
    }
}
