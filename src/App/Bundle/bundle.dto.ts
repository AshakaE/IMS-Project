import { IsArray, IsInt, IsNotEmpty, IsString, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BundleProuctUnits {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id!: string

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty()
  units!: number
}
class CreateBundleDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty()
  quantity!: number

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  sellingPrice!: number

  @IsNotEmpty()
  @ApiProperty()
  costPrice!: number

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
  @ApiProperty({ type: [BundleProuctUnits] })
  productIds!: BundleProuctUnits[]
}

export default CreateBundleDto
