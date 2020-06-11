import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import  Person  from './person.entity';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports:[TypeOrmModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule {}
