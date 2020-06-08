import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {addPerson} from './dto/addPerson.dto'
import {replacePerson} from './dto/replacePerson.dto'
import {Person} from './person.interface'


@Injectable()
export  class PeopleService {
    private id = 0;
    private people :Person[] = [];

     getPeople() {
        return this.people;
    }

     getPerson(id:number) {
        const person = this.people.find(person => person.id === id)
        if(person) return person;
        throw new HttpException('Person not Found',HttpStatus.NOT_FOUND);
     }

     replacePerson(id:number,person:replacePerson) {
         const index = this.people.findIndex(p => p.id === id);
     
         if(index>-1) {
             this.people[index] = person;  
             return this.people;
         }
         throw new HttpException('Person not Found',HttpStatus.NOT_FOUND)
     }

      addPerson(person:addPerson){
          const newPerson = {
              id:++this.id,
              ...person
          }
          this.people.push(newPerson);
          return this.people;

      }

        removePerson(id:number) {
            const index = this.people.findIndex(p => p.id === id);
            if(index > -1){
                this.people.splice(index,1);
                // respond with a 204 status and an empty body
            } else {
                throw new HttpException('People not found',HttpStatus.NOT_FOUND)
            }
        }




}
