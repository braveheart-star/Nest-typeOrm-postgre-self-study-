import { Controller, Body, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { PeopleService } from './people.service'
import {addPerson} from './dto/addPerson.dto'
import {replacePerson} from './dto/replacePerson.dto'


@Controller('people')
export class PeopleController {
    constructor(
        private readonly peopleService:PeopleService
    ){}

    @Get()
    getPeople() {
        return this.peopleService.getPeople();
    }

    @Get(':id') 
    getPerson(@Param('id') id:string ) {
        return this.peopleService.getPerson(Number(id))
    }

    @Put(':id')
    async replacePerson(@Param('id') id:string, @Body() person:replacePerson ) {
        return this.peopleService.replacePerson(Number(id),person)
    }

    @Post()
    async addPerson(@Body() person:addPerson) {
        return this.peopleService.addPerson(person)
    }

    @Delete(':id')
    async removePerson(@Param('id') id:string) {
        this.peopleService.removePerson(Number(id))
    }

}
