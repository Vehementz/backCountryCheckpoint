import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import {
    ObjectType,
    Field,
    ID,
    InputType,
} from "type-graphql";
// import { IsEmail, Length } from "class-validator";



@Entity()
@ObjectType()
export class Country {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ unique: true })
    @Field()
    name: string;

    @Column()
    @Field()
    code: string;

    @Column()
    @Field()
    emoji: string;

    @Column({nullable: true})
    @Field({nullable: true})
    continentCode: string;


    
}


@InputType()
export class CountryInput {

    @Field()
    name: string;

    @Field()
    code: string;

    @Field()
    emoji: string

    @Field({nullable: true})
    continentCode: string;


}



@InputType()
export class CountryDelete {


    @Column({ unique: true })
    @Field()
    code: string;

}