import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CourseDto {
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNotEmpty()
  @IsInt()
  startTime: number;

  @IsNotEmpty()
  @IsInt()
  endTime: number;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  teacherId: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}