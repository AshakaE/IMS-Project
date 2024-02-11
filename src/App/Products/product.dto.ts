import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export enum ProductCategory {
  ELECTRONICS = 'ELT',
  FOOD = 'FD',
}
export enum CategoryType {
  APPLIANCE = 'APL',
}
class CreateProductDto {
  @IsNotEmpty()
  @IsInt()
  @Min(10)
  @ApiProperty()
  cost!: number

  @IsNotEmpty()
  @IsInt()
  @Min(10)
  @ApiProperty()
  units!: number

  @IsNotEmpty()
  @IsInt()
  @Min(15)
  @ApiProperty()
  sellingPrice!: number

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  discount!: number

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
  @IsEnum(ProductCategory)
  @ApiProperty({
    type: 'enum',
    enum: ProductCategory,
    description: 'The category of the product',
    enumName: 'ProductCategory',
  })
  category!: ProductCategory

  @IsNotEmpty()
  @IsEnum(CategoryType)
  @ApiProperty({
    type: 'enum',
    enum: CategoryType,
    description: 'The type of product under the product category',
    enumName: 'CategoryType',
  })
  type!: CategoryType

  @IsOptional()
  @IsString()
  @ApiProperty({ nullable: true })
  csv?: string

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

export default CreateProductDto
