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
import Bundle from '../../Database/Entities/bundle.entity'
import BundlesService from './bundles.service'
import CreateBundleDto from './bundle.dto'

@ApiTags('Bundles')
@Controller('bundles')
class BundlesController {
  constructor(private bundlesService: BundlesService) {}

  @Get()
  async getBundles(): Promise<Bundle[]> {
    return [new Bundle()]
  }

  @Get(':id')
  async getBundle(): Promise<Bundle> {
    return new Bundle()
  }

  @Post('/add')
  async addBundle(@Request() req: any, @Body() bundle: CreateBundleDto) {
    return this.bundlesService.createBundle(bundle)
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
