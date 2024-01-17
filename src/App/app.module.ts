import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import DatabaseModule from '../Database/database.module'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    // ProductsModule,
  ],
  controllers: [AppController],
  //   providers: [AppService],
})
class AppModule {}

export default AppModule
