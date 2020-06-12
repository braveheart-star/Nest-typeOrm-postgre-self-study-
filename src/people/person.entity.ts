import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()

class Person {

    @PrimaryGeneratedColumn()
    public id:number;
    @Column()
    public name: string;
    @Column()
    public gender:boolean;
}

export default Person;