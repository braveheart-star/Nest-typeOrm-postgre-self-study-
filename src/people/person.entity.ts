import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()

class Person {

    @PrimaryGeneratedColumn()
    public id:number;
    @Column()
    public name: string;
    @Column()
    public sex:boolean;
}

export default Person;