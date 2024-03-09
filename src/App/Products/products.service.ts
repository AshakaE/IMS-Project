import { Injectable } from '@nestjs/common'
import ProductsRepository from './products.repository'
import Product from '../../Database/Entities/product.entity'
import CreateProductDto, { ProductCategory } from './product.dto'
import PriceHistoryService from '../PriceHistory/priceHistory.service'
import { EntityType } from '../../Database/Entities/priceHistory.entity'

function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}${month}${day}`
}

@Injectable()
class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly priceHistoryService: PriceHistoryService,
  ) {}

  async products(): Promise<Product[]> {
    return this.productsRepository.find({
      take: 10,
      order: {
        created: 'DESC',
      },
    })
  }

  async product(id: string) {
    let product
    try {
      product = await this.productsRepository.findProduct(id)
    } catch (e: any) {
      console.log(e)
    }
    return product
  }

  async generateSKU(category: ProductCategory, name: string): Promise<string> {
    return `SKU-${category}-${name.substring(0, 3)}-${getCurrentDate()}`
  }

  async createProduct(
    product: CreateProductDto,
    userId: string,
  ): Promise<Product> {
    try {
        console.log(product, userId)
      return {} as Product
    } catch (e) {
      console.error('nammenme', e)
      return {} as Product
    }

    // const sku = await this.generateSKU(product.category, product.productName)
    // const newProduct = this.productsRepository.create({
    //   ...product,
    //   repairMargin: product.sellingPrice - product.cost,
    //   sku,
    // })
    // const createdProduct = await this.productsRepository.save(newProduct)
    // return createdProduct
  }

  async updateProduct(
    product: Product,
    updatedData: Partial<Product>,
  ): Promise<boolean> {
    let data = updatedData

    if (
      updatedData.sellingPrice !== undefined &&
      updatedData.sellingPrice !== product.sellingPrice
    ) {
      data = {
        ...updatedData,
        repairMargin: updatedData.sellingPrice - product.cost,
      }
      await this.priceHistoryService.updatePriceHistory({
        id: product.id,
        updatedData,
        entity: product,
        type: EntityType.PRODUCT,
      })
    }
    const updateResult = await this.productsRepository
      .createQueryBuilder()
      .update()
      .set({ ...data })
      .where({ id: product.id })
      .execute()

    if (
      updateResult &&
      updateResult.affected !== undefined &&
      updateResult.affected > 0
    ) {
      return true
    }

    return false
  }
}

export default ProductsService
