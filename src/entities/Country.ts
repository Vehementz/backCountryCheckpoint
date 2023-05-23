import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import {
    ObjectType,
    Field,
    ID,
    InputType,
} from "type-graphql";
import { IsEmail, Length } from "class-validator";




@Entity()
@ObjectType()
export class Country {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({ unique: true })
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    code: string;


    @Column()
    @Field()
    emoji: string


}

@InputType()
export class CountryInput {
    @Column({ unique: true })
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    code: string;


    @Column()
    @Field()
    emoji: string

}
