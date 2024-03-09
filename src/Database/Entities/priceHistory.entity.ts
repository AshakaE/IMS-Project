import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum EntityType {
  PRODUCT = 'product',
  BUNDLE = 'bundle',
}

@Entity()
class PriceHistory {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  entityId!: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  oldPrice!: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  newPrice!: number

  @Column({ type: 'date' })
  effectiveDate!: Date

  @Column('enum', { enum: EntityType })
  type!: EntityType
}
export default PriceHistory
