import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import dataSource from 'src/db/data-source';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneUser(): Promise<User> {
    return await dataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .getOne()
  }

  async findOneById(id: number): Promise<any> {
    return await this.userRepository.find({where: {id: id}});
  }

  async findByCondition(object: Object): Promise<User> {
    return this.userRepository.findOne(object)
  }
  
  async findAllByCondition(object: Object): Promise<User[]> {
    return this.userRepository.find(object)
  }

  async update(id: number, data: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {id: id}
    })
    return this.userRepository.save({...user, ...data});
  }

  async create(object: UserDto): Promise<User> {
    const newUser = this.userRepository.create(object);
    return this.userRepository.save(object)
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.findByCondition({
      where: { email: email },
    })
  }

  async createUser(data: UserDto): Promise<User> {
    return this.create(data)
  }

  async checkUserExisted(email: string, userId: string): Promise<boolean> {
    if(this.findByEmail(email) || this.userRepository.findOne({where: {userId: userId}})) {
      return true
    }
    return false
  }

  async checkStudent(id: number): Promise<boolean> {
    const user = await this.findOneById(id);
    if(!user || user.roleId != 2) {
      return false;
    }
    return true;
  }
}
