import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

class CreateProductDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  cost!: number

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  units!: number

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  sellingPrice!: number

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  purchaseDate!: Date

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  reOrderQuantity!: number

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  restockLevel!: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  productName!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sku!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  csv!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  location!: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  repairMargin!: number
}

export enum ProductCategory {
  ELECTRONICS = 'elt',
}

// SKU-number-category-product-date
// SKU-1-ELT-LP-2024-01
export default CreateProductDto
