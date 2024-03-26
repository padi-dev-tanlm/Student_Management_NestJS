import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CourseDto } from './dto/course.dto';
import { Student_Course } from 'src/student_courses/entities/student_course.entity';

@Injectable()
export class CoursesService {
 constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Student_Course)
    private student_courseRepository: Repository<Student_Course>
  ) {}
  
  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async findOneById(id: number): Promise<any> {
    return await this.courseRepository.find({where: {id: id}});
  }

  async findByCondition(object: Object): Promise<Course> {
    return this.courseRepository.findOne(object)
  }
  
  async findAllByCondition(object: Object): Promise<Course[]> {
    return this.courseRepository.find(object)
  }

 async update(id: number, data: any): Promise<any> {
    const payload = await this.courseRepository.findOne({
      where: {id: id}
    })
    return this.courseRepository.save({...payload, ...data});
  }

  async create(object: CourseDto): Promise<Course> {
    const newCourse = this.courseRepository.create(object);
    return this.courseRepository.save(newCourse)
  }

  async delete(id: number): Promise<any> {
    return this.courseRepository.delete(id);
  }

  async checkCourseId(id: any): Promise<boolean> {
    const course = this.findOneById(id);
    if(!course) {
      return false;
    }
    return true;
  }

  async checkCourseFull(id: number): Promise<boolean> {
    const course = await this.findOneById(id);
    if(!course) {
      return false;
    }
    const numberStudentInCourse = this.student_courseRepository.count({ where: {courseId: id}});
    if(numberStudentInCourse >= course.quantity) {
      return true;
    }
    return false
  }
}
