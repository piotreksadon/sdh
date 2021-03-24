import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZombieModule } from './zombie/zombie.module';
import { ItemModule } from './item/item.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.PORT,
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DB,
      entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
      synchronize: process.env.SYNCHRONIZE.toLowerCase() === 'true',
      logging: process.env.LOGGING.toLowerCase() === 'true',
    }),
    ZombieModule,
    ItemModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
