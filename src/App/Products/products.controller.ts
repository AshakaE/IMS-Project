import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { ApiBearerAuth, ApiTags, PartialType } from '@nestjs/swagger'
import Product from '../../Database/Entities/product.entity'
import ProductsService from './products.service'
import CreateProductDto from './product.dto'
import JwtAuthGuard from '../Auth/jwt-auth.guard'

export class UpdateProductDto extends PartialType(CreateProductDto) {}

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productsService.products()
  }

  @Get(':id')
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productsService.product(id)
      if (!product) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: `Product with ${id} not found`,
        })
      }
      return res.json(product)
    } catch (error) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable entity',
      })
    }
  }

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @SetMetadata('roles', [Role.ADMIN, Role.ORGANIZER])
  //   @ApiHeader({
  //     name: 'access_token',
  //     description: 'Generated by jwt upon sign in',
  //   })

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addProducts(
    @Request() req: any,
    @Res() res: Response,
    @Body() product: CreateProductDto,
  ) {
    const { id } = req.user
    try {
      if (product?.sellingPrice < product?.cost) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'Selling price cannot be less than cost',
        })
      }
      const newProduct = await this.productsService.createProduct(product, id)
      return res.json(newProduct)
    } catch (error) {
      console.error('Error in product update controller:', error)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable entity',
      })
    }
  }

//   @Put(':id')
//   @ApiBody({ type: UpdateProductDto })
//   async updateProduct(
//     @Request() req: any,
//     @Param('id') id: string,
//     @Res() res: Response,
//     @Body() productUpdate: UpdateProductDto,
//   ) {
//     const existProduct = await this.productsService.product(id)
//     if (!existProduct) {
//       return res.status(HttpStatus.NOT_FOUND).json({
//         status: HttpStatus.NOT_FOUND,
//         message: `Product with ID ${id} not found`,
//       })
//     }
//     const updatedProduct = await this.productsService.updateProduct(
//       existProduct,
//       productUpdate,
//     )
//     if (updatedProduct) {
//       return res.status(HttpStatus.CREATED).json({
//         status: HttpStatus.CREATED,
//         message: 'Product updated successfully',
//       })
//     }
//     return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
//       status: HttpStatus.UNPROCESSABLE_ENTITY,
//       message: 'Unprocessable entity',
//     })
//   }
}

export default ProductsController
