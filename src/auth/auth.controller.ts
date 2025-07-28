import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private authService:AuthService){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req,@Response() res){
        //logic will be implemented later
        return res.status(200).json({
            user: req.user,
        })
    }
}
