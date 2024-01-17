import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('/')
@Controller()
export class AppController {
  @Get('status')
  status() {
    // await this.databaseService.checkConnection()
    return 'API is online'
  }
}

export default AppController
