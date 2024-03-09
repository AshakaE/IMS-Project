import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'
import User from '../../Database/Entities/user.entity'

@Injectable()
class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.findOneBy({
      email,
    })
  }
}

export default UserRepository
