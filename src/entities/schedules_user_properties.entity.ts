import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  FindOperator,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity()
export class Schedules {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  date: string;

  @Column()
  hour: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Properties)
  properties: Properties;
  static user: any;
  static propertyId: string | FindOperator<string> | undefined;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
