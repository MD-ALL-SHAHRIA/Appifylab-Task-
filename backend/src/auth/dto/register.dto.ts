import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto 


{
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;


  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  
}
