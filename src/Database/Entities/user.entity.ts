/* eslint-disable import/no-cycle */
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import Location from './location.entity'
import Product from './product.entity'
import Bundle from './bundle.entity'

export enum Role {
  SUPERUSER = 'superuser',
  ADMIN = 'admin',
}

@Entity()
class User {
  @Generated('uuid')
  @Column('varchar')
  id!: string

  @Column('text')
  firstName!: string

  @Column('text')
  lastName!: string

  @PrimaryColumn('varchar')
  email!: string

  @Column('text')
  phone!: string

  @Column('text')
  company!: string
  
  @Column('text')
  password!: string

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date

  @Column('enum', {
    enum: Role,
    array: true,
    default: [Role.SUPERUSER],
  })
  roles!: Role[]

  @Column('boolean', {
    default: false,
  })
  status!: boolean

  @OneToMany(() => Location, location => location.user)
  locations!: Location[]

  @OneToMany(() => Product, product => product.user)
  products!: Product[]

  @OneToMany(() => Bundle, bundles => bundles.user)
  bundles!: Bundle[]
}

export default User
