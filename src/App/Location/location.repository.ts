import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'
import Location from '../../Database/Entities/location.entity'

@Injectable()
class LocationsRepository extends Repository<Location> {
  constructor(private dataSource: DataSource) {
    super(Location, dataSource.createEntityManager())
  }
}

export default LocationsRepository
