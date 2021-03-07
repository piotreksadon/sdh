import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZombieModule } from './zombie/zombie.module';
import { ItemModule } from './item/item.module';

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
    ZombieModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
