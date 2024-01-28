// bundle.entity.ts

import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm'
import Product from './product.entity'

@Entity()
class Bundle {
  @PrimaryColumn('varchar', {
    length: 255,
  })
  id!: string

  @Column()
  bundleName!: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costPrice!: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sellingPrice!: number

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  margin!: number

  @Column({ default: 1 })
  quantity!: number

  @ManyToMany(() => Product, { eager: true })
  @JoinTable({
    name: 'bundleProducts',
    joinColumn: { name: 'bundleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products!: Partial<Product>[]

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date
}

export default Bundle
