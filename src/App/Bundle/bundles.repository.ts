import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'
import Bundle from '../../Database/Entities/bundle.entity'

@Injectable()
class BundlesRepository extends Repository<Bundle> {
  constructor(private dataSource: DataSource) {
    super(Bundle, dataSource.createEntityManager())
  }

  async findBundle(id: string) {
    return this.findOneBy({ id })
  }
}

export default BundlesRepository
