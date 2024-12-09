import { NestMiddleware } from '@nestjs/common';

export class OutroMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    console.log('SimpleMiddleware: ola');
    // return res.status(404).send({
    //   message: 'Não encontrado',
    // });
    next();
  }
}
