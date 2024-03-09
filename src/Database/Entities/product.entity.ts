/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import BinCard from './bin.entity'
import User from './user.entity'

@Entity()
class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  cost!: number

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 }) // in percent
  discount?: number

  @Column()
  sellingPrice!: number

  @CreateDateColumn()
  purchaseDate!: Date

  @Column('integer')
  reOrderQuantity!: number

  @Column('integer', { default: 0 }) // TODO: set level (re-order point), alert when level reached, including the length of time it took to reach minimum order quantity —> email, colour change
  reStockLevel?: number

  @Column()
  brand!: string

  @Column()
  name!: string

  @Column('varchar')
  sku!: string

  @Column('varchar')
  type!: string

  @Column('integer')
  repairMargin!: number

  @Column('text', { nullable: true })
  csv?: string

  //   @Column('json')
  //   category!: Category[]

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date

  @Column('json', { nullable: true, default: [] }) // TODO: possibility of different views
  images!: string[]

  @OneToMany(
    () => BinCard,
    (binCard) => binCard.product,
  )
  binCards!: BinCard[]

  @ManyToOne(
    () => User,
    (user) => user.products,
  )
  @JoinColumn({ name: 'userId' })
  user!: User
}

export default Product
