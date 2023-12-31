/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReseniaEntity } from './resenia.entity';
import { ReseniaService } from './resenia.service';
import { ReseniaController } from './resenia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReseniaEntity])],
  providers: [ReseniaService],
  controllers: [ReseniaController]
})
export class ReseniaModule {}
