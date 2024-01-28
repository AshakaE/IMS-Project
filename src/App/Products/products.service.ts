import { Injectable } from '@nestjs/common'
import { UpdateResult } from 'typeorm'
import ProductsRepository from './products.repository'
import Product from '../../Database/Entities/product.entity'
import CreateProductDto from './product.dto'
import PriceHistoryService from '../PriceHistory/priceHistory.service'
import { EntityType } from '../../Database/Entities/priceHistory.entity'

@Injectable()
class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly priceHistoryService: PriceHistoryService,
  ) {}

  async createProduct(product: CreateProductDto) {
    const newProduct = this.productsRepository.create({
      ...product,
      repairMargin: product.sellingPrice - product.cost,
    })
    const createdProduct = await this.productsRepository.save(newProduct)
    return createdProduct
  }

  async updateProduct(
    id: string,
    updatedData: Partial<Product>,
  ): Promise<UpdateResult> {
    const product = await this.productsRepository.findOneBy({ id })

    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }

    await this.priceHistoryService.updatePriceHistory({
      id,
      updatedData,
      entity: product,
      type: EntityType.PRODUCT,
    })

    const updateResult = await this.productsRepository
      .createQueryBuilder()
      .update()
      .set({ ...updatedData })
      .where({ id })
      .execute()

    return updateResult
  }
}

export default ProductsService
