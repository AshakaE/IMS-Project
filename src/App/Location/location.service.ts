import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common'
import LocationsRepository from './location.repository'
import CreateLocationDto from './location.dto'
import UserRepository from '../Users/user.repository'

@Injectable()
class LocationsService {
  constructor(
    private locationsRepository: LocationsRepository,
    private userRepository: UserRepository,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async addLocation(data: CreateLocationDto, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId })

    if (!user) {
      throw new Error(`User with ID ${userId} not found`)
    }

    const newLocation = this.locationsRepository.create({
      ...data,
      user,
    })

    const location = await this.locationsRepository.save(newLocation)
    const { password, ...destinationObject } = location.user
    const sanitizedLocation = {
      ...location,
      user: destinationObject,
    }

    return sanitizedLocation
  }
}
export default LocationsService
