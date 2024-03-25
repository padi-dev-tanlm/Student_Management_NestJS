import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';

export class Student_CourseDto {
  @IsNotEmpty()
  @IsString()
  studentId: number;

  @IsNotEmpty()
  @IsString()
  courseId: number;
}