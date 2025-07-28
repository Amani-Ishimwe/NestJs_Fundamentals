import { Prisma } from 'generated/prisma';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class TodosService {   
   
 constructor(private readonly prisma: PrismaService){}

  create(userId:number,todo: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({
      data:{
        ...todo,
        user:{
          connect:{
            id:userId
          },
        },
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.todo.findMany({
      where: {
        userId
      }
    });
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({
      where:{
        id,
      }
    });
  }

  update(id: number, todo:Prisma.TodoUpdateInput) {
    return this.prisma.todo.update({
      where:{
        id,
      },
      data: todo
    });
  }

  remove(id: number) {
     return this.prisma.todo.delete({
      where:{
        id,
      }
    });
  }
}
