import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Store extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  address: string;

  @OneToOne(() => User, user => user.ownStore)
  @Field(() => User)
  owner: User;
}
