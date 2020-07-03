import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { addPerson } from './dto/addPerson.dto';
import { replacePerson } from './dto/replacePerson.dto';
// import {Person} from './person.interface'

import { InjectRepository } from '@nestjs/typeorm';
import Person from './person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
  ) {}

  private id = 0;

  getPeople() {
    return this.peopleRepository.find();
  }

  async getPerson(id: number) {
    const person = this.peopleRepository.findOne(id);
    if (person) return person;
    throw new HttpException('Person not Found', HttpStatus.NOT_FOUND);
  }

  async replacePerson(id: number, person: replacePerson) {
    await this.peopleRepository.update(id, person);
    const replacedPerson = await this.peopleRepository.findOne(id);

    if (replacedPerson) {
      return this.peopleRepository.find();
    }
    throw new HttpException('Person not Found', HttpStatus.NOT_FOUND);
  }

  async addPerson(person: addPerson) {
    const newPerson = await this.peopleRepository.create(person);
    const savedPerson = await this.peopleRepository.save(newPerson);
    return savedPerson;
  }

  async removePerson(id: number) {
    const deleteResponse = await this.peopleRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new HttpException('People not found', HttpStatus.NOT_FOUND);
    }
  }
}
