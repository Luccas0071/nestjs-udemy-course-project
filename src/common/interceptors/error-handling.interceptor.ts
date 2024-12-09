import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ErrorHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('ErrorHandlingInterceptor executado ANTES.');

    // await new Promise((resolve) => setTimeout(resolve, 10000));

    return next.handle().pipe(
      catchError((error) => {
        console.log(error.name);
        console.log(error.message);
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.message);
          }
        });
      }),
    );
  }
}
