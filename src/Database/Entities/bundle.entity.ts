/* eslint-disable import/no-cycle */
// bundle.entity.ts

import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import Product from './product.entity'
import BinCard from './bin.entity'
import User from './user.entity'

@Entity()
class Bundle {
  @PrimaryGeneratedColumn('uuid')
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

  @ManyToOne(() => User, user => user.bundles)
  @JoinColumn({ name: 'userId' })
  user!: User

  @OneToMany(() => BinCard, binCard => binCard.bundle)
  binCards!: BinCard[]
}

export default Bundle
