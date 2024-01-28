import { Injectable } from '@nestjs/common'
import Bundle from '../../Database/Entities/bundle.entity'
import PriceHistoryRepository from './priceHistory.repository'
import Product from '../../Database/Entities/product.entity'
import CreateBundleDto from '../Bundle/bundle.dto'
import { EntityType } from '../../Database/Entities/priceHistory.entity'

export type PriceUpdateData = {
  id: string
  updatedData: Partial<CreateBundleDto>
  entity: Product | Bundle
  type: EntityType
}

@Injectable()
class PriceHistoryService {
  constructor(private readonly priceHistory: PriceHistoryRepository) {}

  async updatePriceHistory(priceUpdateData: PriceUpdateData): Promise<void> {
    const { id, updatedData, entity, type } = priceUpdateData
    if (
      updatedData.sellingPrice !== undefined &&
      updatedData.sellingPrice !== entity.sellingPrice
    ) {
      const newPriceHistory = this.priceHistory.create({
        entityId: id,
        oldPrice: entity.sellingPrice,
        newPrice: updatedData.sellingPrice,
        type,
        effectiveDate: new Date(),
      })

      await this.priceHistory.save(newPriceHistory)
    }
  }
}

export default PriceHistoryService
