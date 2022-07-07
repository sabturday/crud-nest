import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pizza } from './pizzas/entities/pizza.entity';
import { PizzasModule } from './pizzas/pizzas.module';

@Module({
  imports: [PizzasModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Pizza],
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
