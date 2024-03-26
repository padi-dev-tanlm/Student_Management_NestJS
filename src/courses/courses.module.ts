import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
// import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesController } from './courses.controller';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Student_Course } from 'src/student_courses/entities/student_course.entity';
import { Student_CoursesService } from 'src/student_courses/student_courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Student_Course, User])],
  controllers: [CoursesController],
  providers: [CoursesService, Student_CoursesService, UsersService],
  exports: [CoursesService]
})
export class CoursesModule {}
