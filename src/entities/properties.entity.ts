import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Addresses } from "./addresses.entity";
import { Category } from "./category.entity";
import { Schedules } from "./schedules_user_properties.entity";

@Entity()
export class Properties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  sold: boolean;

  @Column()
  value: number;

  @Column()
  size: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany(() => Schedules, (schedules) => schedules.properties, {
    eager: true,
  })
  schedules: Schedules[];

  @ManyToOne(() => Category)
  category: Category;

  @OneToOne((type) => Addresses, {
    eager: true,
  })
  @JoinColumn()
  address: Addresses;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.sold) {
      this.sold = false;
    }
  }
}
