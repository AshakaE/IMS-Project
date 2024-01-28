import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'
import PriceHistory from '../../Database/Entities/priceHistory.entity'

@Injectable()
class PriceHistoryRepository extends Repository<PriceHistory> {
  constructor(private dataSource: DataSource) {
    super(PriceHistory, dataSource.createEntityManager())
  }
}

export default PriceHistoryRepository
