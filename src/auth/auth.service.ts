import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private  usersService: UsersService,
        private jwtService:JwtService
    ) {}

    async validateUser(
        username:string,
        password:string
    ):Promise<Omit<User,'password'>|null>{
        const user = await this.usersService.findOne({ username})
        if(user?.password == null){
            return null;
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(isPasswordMatch){
            return {
                id: user.id,
                username: user.username
            }
        }
        return null;
    }
    login(user: Omit<User, 'password'>|null){
        if (user == null){
            throw new Error('Invalid User')
        }
        return {
            access_token: this.jwtService.sign({
                sub: user.id
            })
        }
    }
}