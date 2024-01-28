/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import Product from './product.entity'

@Entity()
class BinCard {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product!: Product

  @Column({ type: 'date' })
  date!: Date

  @Column()
  location!: string

  @Column()
  quantity!: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costPrice!: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sellingPrice!: number
}

export default BinCard
