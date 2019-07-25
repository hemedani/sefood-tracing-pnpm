import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { City } from "./City";

@ObjectType()
@Entity()
export class Parish extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  EnName: string;

  @Field(() => City)
  @ManyToOne(() => City, city => city.parishes)
  city: City;
}
