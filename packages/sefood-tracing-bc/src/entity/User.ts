import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID, Root, registerEnumType } from "type-graphql";
import { Store } from "./Store";

enum UserRole {
  Normal = "Normal",
  Admin = "Admin",
  UnitEmployee = "UnitEmployee",
  StoreBoss = "StoreBoss",
  OrganizationBoss = "OrganizationBoss",
  UniversityBoss = "UniversityBoss",
  DiagnosisPosition = "DiagnosisPosition"
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "the role enums for user access level"
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column("int", { unique: true })
  phone: number;

  @Field()
  @Column()
  authCode: number;

  @Field()
  @Column("bool", { default: false })
  phoneValidate: boolean;

  @Field(() => UserRole)
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Normal
  })
  role: UserRole;

  @OneToOne(() => Store, store => store.owner)
  @JoinColumn()
  @Field(() => Store)
  ownStore: Store;

  @Column()
  password: string;
}
