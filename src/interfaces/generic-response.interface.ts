import { ApiProperty } from '@nestjs/swagger';

export interface IGenericResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export class GenericResponse<T> implements IGenericResponse<T> {
  @ApiProperty()
  success: boolean = true;
  @ApiProperty()
  message: string = "All the queries were executed.";
  @ApiProperty()
  data?: T;
  @ApiProperty()
  handledError?: boolean;
  @ApiProperty()
  code?: string;

  constructor(
    data: T,
    success: boolean = true,
    message: string = "All the queries were executed.",
    handledError?: boolean,
    code?:string
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.handledError = handledError;
    this.code = code;
  }
}
