/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import Category from './category.entity'
import BinCard from './bin.entity'

@Entity()
class Product {
  @PrimaryColumn('varchar', {
    length: 255,
  })
  id!: string

  @Column()
  cost!: number

  @Column()
  units!: number

  @Column() // depends on location
  tax!: number

  @Column({ type: 'decimal', precision: 5, scale: 2 }) // in percent
  discount!: number

  @Column()
  sellingPrice!: number

  @CreateDateColumn()
  purchaseDate!: Date

  @Column('integer')
  reOrderQuantity!: number

  @Column('integer') // TODO: set level (re-order point), alert when level reached, including the length of time it took to reach minimum order quantity —> email, colour change
  reStockLevel!: number

  @Column()
  productName!: string

  @Column('varchar')
  sku!: string

  @Column('varchar')
  type!: string

  @Column('integer')
  repairMargin!: number

  @Column('text')
  csv!: string

  @Column('text')
  location!: string

  @Column('json')
  category!: Category[]

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date

  @Column('json', { nullable: true }) // TODO: possibility of different views
  images!: string[]

  @OneToMany(
    () => BinCard,
    (binCard) => binCard.product,
  )
  binCards!: BinCard[]
}

export default Product
