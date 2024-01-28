import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

class CreateBundleDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  quantity!: number

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  sellingPrice!: number

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  constPrice!: Date

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bundleName!: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  margin!: number

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  productIds!: number[]
}

export default CreateBundleDto
