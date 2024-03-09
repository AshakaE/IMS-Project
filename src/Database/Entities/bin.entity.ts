/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import Product from './product.entity'
import Bundle from './bundle.entity'

@Entity()
class BinCard {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product!: Product

  @ManyToOne(() => Bundle, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bundleId' })
  bundle!: Bundle

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
