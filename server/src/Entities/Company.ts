import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  role!:string;

  @Column()
  yearOfCreation!: string;

  @OneToMany(() => Users, (user: Users) => user.company)
  users?: Users[]
}
