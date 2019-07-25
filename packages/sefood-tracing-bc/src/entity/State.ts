import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { City } from "./City";

@ObjectType()
@Entity()
export class State extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  EnName: string;

  @Field(() => [City])
  @OneToMany(() => City, city => city.state)
  cities: City[];
}
