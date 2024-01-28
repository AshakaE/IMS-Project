import { Module } from '@nestjs/common'
import BundlesRepository from './bundles.repository'
import BundlesController from './bundles.controller'
import BundlesService from './bundles.service'
import PriceHistoryRepository from '../PriceHistory/priceHistory.repository'
import PriceHistoryService from '../PriceHistory/priceHistory.service'
import ProductsRepository from '../Products/products.repository'

@Module({
  controllers: [BundlesController],
  providers: [BundlesService, BundlesRepository, PriceHistoryRepository, PriceHistoryService, ProductsRepository],
  exports: [BundlesService],
})
class BundlesModule {}

export default BundlesModule
