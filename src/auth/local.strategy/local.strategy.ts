import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }
    async validate(username:string, password:string): Promise<any>{
         const user = await this.authService.validateUser(username, password);
         if(user == null){
            throw new Error('Invalid credentials')
         }
         return user;
    }
  }

