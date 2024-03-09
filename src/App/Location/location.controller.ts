import {
  UseGuards,
  Post,
  Res,
  Body,
  Request,
  Controller,
  SetMetadata,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import JwtAuthGuard from '../Auth/jwt-auth.guard'
import LocationsService from './location.service'
import RolesGuard from '../Auth/roles.guard'
import { Role } from '../../Database/Entities/user.entity'
import CreateLocationDto from './location.dto'

@ApiBearerAuth()
@ApiTags('Location')
@Controller('Location')
class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.SUPERUSER])
  @Post('/add')
  async addLocation(
    @Res() res: Response,
    @Body() location: CreateLocationDto,
    @Request() req: any,
  ) {
    const { id } = req.user
    const newLocation = await this.locationsService.addLocation(location, id)
    return res.status(HttpStatus.CREATED).json({
      data: newLocation,
    })
  }
}

export default LocationsController
