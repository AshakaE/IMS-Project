import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import Product from './Entities/product.entity'
import ProductPriceHistory from './Entities/priceHistory.entity'
import Bundle from './Entities/bundle.entity'
import Category from './Entities/category.entity'
import BinCard from './Entities/bin.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: 5432,
        host: configService.get('DATABASE_HOST'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        entities: [Product, ProductPriceHistory, Bundle, Category, BinCard],
        synchronize: true,
        keepConnectionAlive: true,
        // logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
class DatabaseModule {}

export default DatabaseModule
