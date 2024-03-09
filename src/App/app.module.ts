import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import DatabaseModule from '../Database/database.module'
import AppController from './app.controller'
import ProductsModule from './Products/product.module'
import PriceHistoryModule from './PriceHistory/priceHistory.module'
import BundlesModule from './Bundle/bundles.module'
import AuthModule from './Auth/auth.module'
import UsersModule from './Users/user.module'
import LocationsModule from './Location/location.module'
import MailModule from './Mailer/mail.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MailModule,
    UsersModule,
    BundlesModule,
    ProductsModule,
    DatabaseModule,
    LocationsModule,
    PriceHistoryModule,
  ],
  controllers: [AppController],
})
class AppModule {}

export default AppModule
