import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Param,
  Put,
  HttpStatus,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import Bundle from '../../Database/Entities/bundle.entity'
import BundlesService from './bundles.service'
import CreateBundleDto from './bundle.dto'

@ApiTags('Bundles')
@Controller('bundles')
class BundlesController {
  constructor(private bundlesService: BundlesService) {}

  @Get()
  async getBundles(): Promise<Bundle[]> {
    return this.bundlesService.bundles()
  }

  @Get(':id')
  async getBundle(@Param('id') id: string, @Res() res: Response) {
    try {
      const bundle = await this.bundlesService.bundle(id)
      if (!bundle) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: `Bundle with id ${id} not found`,
        })
      }
      return res.json(bundle)
    } catch (error) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable entity',
      })
    }
  }

  @Post('/add')
  async addBundle(
    @Request() req: any,
    @Res() res: Response,
    @Body() bundle: CreateBundleDto,
  ) {
    try {
      // return res.status(HttpStatus.NOT_FOUND).json({
      //   status: HttpStatus.NOT_FOUND,
      //   message: `Selling price cannot be less than cost`,
      // })
    //   console.log(bundle)
      const newBundle = await this.bundlesService.createBundle(bundle)
      return res.json(newBundle)
    } catch (error: any) {
      console.error('Error in creating bundle controller:', error.message)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: error.message,
      })
    }
  }

  @Put(':id')
  async updateBundle(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updatedData: CreateBundleDto,
  ) {
    return this.bundlesService.updateBundle(id, updatedData)
  }
}

export default BundlesController
