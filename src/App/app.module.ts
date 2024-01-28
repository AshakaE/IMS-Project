import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import DatabaseModule from '../Database/database.module'
import { AppController } from './app.controller'
import ProductsModule from './Products/product.module'
import PriceHistoryModule from './PriceHistory/priceHistory.module'
import BundlesModule from './Bundle/bundles.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
    BundlesModule,
    PriceHistoryModule,
  ],
  controllers: [AppController],
})
class AppModule {}

export default AppModule
