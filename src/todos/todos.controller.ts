import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Prisma, User as UserModel } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { User } from 'src/users/users/users.decorator';
import { TodosGuard } from './todos/todos.guard';

@Controller('todos')
@UseGuards(TodosGuard)
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@User() user: UserModel, @Body() todo: Prisma.TodoCreateInput) {
    return this.todosService.create(user.id, todo);
  }

  @Get()
  findAll(@User() user: UserModel) {
    return this.todosService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todo: Prisma.TodoUpdateInput) {
    return this.todosService.update(+id, todo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
