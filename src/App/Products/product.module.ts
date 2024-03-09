import { Module } from '@nestjs/common'
import ProductsRepository from './products.repository'
import ProductsController from './products.controller'
import ProductsService from './products.service'
import PriceHistoryRepository from '../PriceHistory/priceHistory.repository'
import PriceHistoryService from '../PriceHistory/priceHistory.service'

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    PriceHistoryRepository,
    PriceHistoryService,
  ],
  exports: [ProductsService],
})
class ProductsModule {}

export default ProductsModule
