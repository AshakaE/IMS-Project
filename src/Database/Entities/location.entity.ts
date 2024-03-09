/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import User from './user.entity'

export enum LocationType {
  WAREHOUSE = 'WH',
  STORE = 'ST',
  HEADQUARTERS = 'HQ',
}

@Entity()
class Location {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  address!: string

  @Column()
  type!: string

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date

  @ManyToOne(() => User, user => user.locations)
  @JoinColumn({ name: 'userId' })
  user!: User
}

export default Location
