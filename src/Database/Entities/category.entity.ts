/* eslint-disable import/no-cycle */
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
class Category {
  @PrimaryColumn('varchar', {
    length: 255,
  })
  id!: string

  @Column('varchar')
  title = ''

  @Column('text')
  description = ''

  @Column('varchar')
  icon = ''

  @Column('smallint')
  weight = 0
}

export default Category
