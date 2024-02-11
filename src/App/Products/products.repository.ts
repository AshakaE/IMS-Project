import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'
import Product from '../../Database/Entities/product.entity'

@Injectable()
class ProductsRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager())
  }

  async findProduct(id: string) {
    return this.findOneBy({ id })
  }
}

export default ProductsRepository
