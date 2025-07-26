
import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class UsersService {
    constructor (private readonly prisma: PrismaService) {}
    findOne(findUserUniqueArgs: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: findUserUniqueArgs
        });
    }
}
