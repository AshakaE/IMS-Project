import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm'

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

  @Column()
  sellingPrice!: number

  @CreateDateColumn()
  purchaseDate!: Date

  @Column('integer')
  reOrderQuantity!: number

  @Column('integer') // TODO: set level (re-order point), alert when level reached, including the length of time it took to reach minimum order quantity —> email, colour change
  restockLevel!: number

  @Column()
  image!: string

  @Column()
  productName!: string

  @Column('varchar')
  sku!: string

  @Column('varchar')
  type!: string

  @Column('integer', { default: 'SP- CP' }) // TODO: update default logic
  repairMargin!: number

  @Column('text')
  csv!: string

  @Column('text')
  location!: string

  //   @Column('json') // TODO: possibility of different views
  //   category!: Category[];

  //   @Column('text')
  //   binCard!: string;

  //   @Column('json', { nullable: true }) // TODO: possibility of different views
  //   images!: Image[];
}

export default Product
