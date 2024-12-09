import { DynamicModule, Module } from '@nestjs/common';
export type MyDinamicModuleConfigs = {
  apiKey: string;
  apiUrl: string;
};

export const MY_DYNAMIC_CONFIG = 'MY_DYNAMIC_CONFIG';

@Module({})
export class MyDynamicModule {
  // Nomenclaturas comumente utilizadas
  // static forRootAsync
  // static forRoot

  static register(myModuleConfigs: MyDinamicModuleConfigs): DynamicModule {
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [
        {
          provide: MY_DYNAMIC_CONFIG,
          useValue: myModuleConfigs,
        },
      ],
      controllers: [],
      exports: [MY_DYNAMIC_CONFIG],
      // global: true,
    };
  }
}
