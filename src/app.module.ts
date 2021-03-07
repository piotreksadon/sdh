import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZombiesModule } from './zombies/zombies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'zombie',
      entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
      synchronize: true,
      logging: true,
    }),
    ZombiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
