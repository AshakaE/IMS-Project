import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Param,
  Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import Product from '../../Database/Entities/product.entity'
import ProductsService from './products.service'
import CreateProductDto from './product.dto'

@ApiTags('Products')
@Controller('products')
class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return [new Product()]
  }

  @Get(':id')
  async getProduct(): Promise<Product> {
    return new Product()
  }

  @Post('/add')
  async addProducts(@Request() req: any, @Body() product: CreateProductDto) {
    return this.productsService.createProduct(product)
  }

  @Put(':id')
  async updateProduct(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updatedData: Partial<Product>,
  ) {
    return this.productsService.updateProduct(id, updatedData)
  }
}

export default ProductsController
