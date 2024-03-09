import { Module } from '@nestjs/common'
import PriceHistoryRepository from './priceHistory.repository'
import PriceHistoryService from './priceHistory.service'

@Module({
  providers: [PriceHistoryRepository, PriceHistoryService],
  exports: [PriceHistoryRepository, PriceHistoryService],
})
class PriceHistoryModule {}

export default PriceHistoryModule
