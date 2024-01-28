import { Injectable } from '@nestjs/common'
import { In, UpdateResult } from 'typeorm'
import BundlesRepository from './bundles.repository'
import Bundle from '../../Database/Entities/bundle.entity'
import ProductsRepository from '../Products/products.repository'
import CreateBundleDto from './bundle.dto'
import { EntityType } from '../../Database/Entities/priceHistory.entity'
import PriceHistoryService from '../PriceHistory/priceHistory.service'

@Injectable()
class BundlesService {
  constructor(
    private readonly bundlesRepository: BundlesRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly priceHistoryService: PriceHistoryService,
  ) {}

  async createBundle(bundleData: CreateBundleDto): Promise<Bundle> {
    const bundle = this.bundlesRepository.create(bundleData)

    const products = await this.productsRepository.find({
      where: {
        id: In(bundleData.productIds),
      },
    })

    bundle.products = products.map(e => ({
      id: e.id,
      units: e.units,
    }))
    const newBundle = await this.bundlesRepository.save(bundle)
    return newBundle
  }

  async updateBundle(
    id: string,
    updatedData: CreateBundleDto,
  ): Promise<UpdateResult> {
    const bundle = await this.bundlesRepository.findOneBy({ id })

    if (!bundle) {
      throw new Error(`Bundle with id ${id} not found`)
    }

    await this.priceHistoryService.updatePriceHistory({
      id,
      updatedData,
      entity: bundle,
      type: EntityType.BUNDLE,
    })

    const updateResult = await this.bundlesRepository
      .createQueryBuilder()
      .update()
      .set({ ...updatedData })
      .where({ id })
      .execute()

    return updateResult
  }
}

export default BundlesService
