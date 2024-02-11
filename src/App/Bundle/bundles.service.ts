import { Injectable } from '@nestjs/common'
import { UpdateResult } from 'typeorm'
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

  async bundles(): Promise<Bundle[]> {
    return this.bundlesRepository.find({
      take: 10,
      order: {
        created: 'DESC',
      },
    })
  }

  async bundle(id: string) {
    let product
    try {
      product = await this.bundlesRepository.findBundle(id)
    } catch (e: any) {
      console.log(e)
    }
    return product
  }

  async createBundle(bundleData: CreateBundleDto): Promise<Bundle> {
    let totalCostPrice = 0
    for (const productInfo of bundleData.productIds) {
      const product = await this.productsRepository.findOneBy({
        id: productInfo.id,
      })

      if (!product) {
        throw new Error(`Product with ID ${productInfo.id} not found`)
      }

      const totalProductsNeeded = productInfo.units * bundleData.quantity
      console.log(product.units , totalProductsNeeded)
      if (product.units < totalProductsNeeded) {
        throw new Error('Not enough products to create bundle')
      }

      totalCostPrice += bundleData.quantity * (product.cost * productInfo.units)
    }

    // Step 2: Check bundle selling price
    if (bundleData.sellingPrice < totalCostPrice) {
      throw new Error(
        `Bundle selling price ${bundleData.sellingPrice} cannot be less than bundle cost price ${totalCostPrice}`,
      )

      // use callbck to finish it up
    }

    await Promise.all(
      bundleData.productIds.map(async productInfo => {
        const product = await this.productsRepository.findOneBy({
          id: productInfo.id,
        })

        if (!product) {
          // Handle error or log
          return
        }

        const totalProductsNeeded = productInfo.units * bundleData.quantity
        product.units -= totalProductsNeeded
        await this.productsRepository.save(product)
      }),
    )

    const bundle = this.bundlesRepository.create({
      ...bundleData,
      costPrice: totalCostPrice,
      margin: bundleData.sellingPrice - totalCostPrice,
    })
    bundle.products = { ...bundleData.productIds }

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
