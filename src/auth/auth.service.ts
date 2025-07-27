import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor (private readonly usersService: UsersService) {}

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
}