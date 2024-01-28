import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'
import Product from '../../Database/Entities/product.entity'

@Injectable()
class ProductsRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager())
  }
}

export default ProductsRepository
