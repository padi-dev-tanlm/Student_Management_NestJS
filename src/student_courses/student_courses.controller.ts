import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { Student_CoursesService } from './student_courses.service';
import { UsersService } from 'src/users/users.service';
import { Student_CourseDto } from './dto/student_courses.dto';
import { AdminAuthGuard } from 'src/auth/guard/admin-auth.guard';


@Controller()
  export class Student_CoursesController {
  constructor(
    protected student_courseService: Student_CoursesService, 
    protected userService: UsersService,
    protected courseService: CoursesService,
  ) {
  }

  @UseGuards(AdminAuthGuard)
  @Post('/add-student-to-course')
  async addStudentToCourse(@Body() body: any) {
    try {
      const data = body;
      const course = await this.courseService.findByCondition({
        where: {id: data.courseId}
      });
      if(!course) {
        return {
          message: 'Course ID is not existed'
        }
      }

      if(!this.userService.checkStudent(data.studentId)) {
        return {
          message: 'Student ID is not existed'
        }
      }

      if(this.courseService.checkCourseFull(data.courseId)) {
        return {
          message: 'The course is full'
        }
      }
      
      if(this.student_courseService.checkExisted(data.studentId, data.courseId)) {
        return {
          message: 'Existed'
        }
      }
      await this.student_courseService.create(data);
      return {
        message: 'Success',
        data: data
      } 
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed',
      }
    }
  }

  @UseGuards(AdminAuthGuard)
  @Post('/delete-student-from-course')
  async deleteGameFromCourse(@Body() body: Student_CourseDto) {
    try {
      const courseId = body.courseId;
      const studentId = body.studentId;

      const data = await this.student_courseService.findByCondition({
        where: {courseId: courseId, studentId: studentId}
      })

      if(!data) {
        return {
          message: 'Not found'
        }
      }
      await this.student_courseService.delete(data.id)

      return {
        message: 'Success',
        data: data
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed'
      }
    }
  }
}