import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
async onModuleInit() {
    this.$connect()
    console.log("Database Connected Successfully")
}

async onModuleDestroy() {
    this.$disconnect()
}
}
