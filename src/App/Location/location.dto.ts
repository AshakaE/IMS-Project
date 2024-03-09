import { ApiProperty } from '@nestjs/swagger'
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator'
import { LocationType } from '../../Database/Entities/location.entity'

class CreateLocationDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  address!: string

  @IsNotEmpty()
  @IsEnum(LocationType)
  @ApiProperty({
    type: 'enum',
    enum: LocationType,
    description: 'The type of location where product will be stored',
    enumName: 'LocationType',
  })
  type!: string

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty()
  contact!: string
}

export default CreateLocationDto
