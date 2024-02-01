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
    return this.productsService.products()
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.product(id)
  }

  @Post('/add')
  async addProducts(@Request() req: any, @Body() product: CreateProductDto) {
    return this.productsService.createProduct(product)
  }

  @Put(':id')
  async updateProduct(
    @Request() req: any,
    @Param('id') id: string,
    @Body() product: CreateProductDto,
  ) {
    return this.productsService.updateProduct(id, product)
  }
}

export default ProductsController
