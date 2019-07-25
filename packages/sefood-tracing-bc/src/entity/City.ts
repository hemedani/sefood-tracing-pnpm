import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Parish } from "./Parish";
import { State } from "./State";

@ObjectType()
@Entity()
export class City extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  EnName: string;

  @Field(() => [Parish])
  @OneToMany(() => Parish, parish => parish.city)
  parishes: Parish[];

  @Field(() => State)
  @OneToMany(() => State, state => state.cities)
  state: State;
}
