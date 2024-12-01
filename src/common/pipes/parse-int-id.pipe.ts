import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const paersedValue = Number(value);

    if (isNaN(paersedValue)) {
      throw new BadRequestException(
        'ParseIntIdPipe espera uma string numérica',
      );
    }

    if (paersedValue < 0) {
      throw new BadRequestException(
        'ParseIntIdPipe espera um número maior do que zero',
      );
    }

    return paersedValue;
  }
}
