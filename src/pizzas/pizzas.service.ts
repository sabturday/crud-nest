import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './entities/pizza.entity';

@Injectable()
export class PizzasService {
  constructor(@InjectRepository(Pizza) private pizzasRepository: Repository<Pizza>) {}

  create(createPizzaDto: CreatePizzaDto) {
    const newPizza = this.pizzasRepository.create(createPizzaDto);
    return this.pizzasRepository.save(newPizza);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.pizzasRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const Pizza = await this.pizzasRepository.findOneBy({id: id});
    if (!Pizza) {
      throw new NotFoundException(`Pizza #${id} not found`);
    }
    return Pizza;
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto) {
    const Pizza = await this.pizzasRepository.preload({
      id: +id,
      ...updatePizzaDto,
    });
    if (!Pizza) {
      throw new NotFoundException(`Pizza #${id} not found`)
    }
    return this.pizzasRepository.save(Pizza);
  }

  async remove(id: number) {
    const Pizza = await this.findOne(id)
    return this.pizzasRepository.remove(Pizza);
  }
}
