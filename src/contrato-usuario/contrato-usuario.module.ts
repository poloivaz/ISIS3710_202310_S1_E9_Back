import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { ContratoEntity } from 'src/contrato/contrato.entity';
import { ContratoUsuarioService } from './contrato-usuario.service';
import { ContratoUsuarioController } from './contrato-usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoEntity, UsuarioEntity])],
  providers: [ContratoUsuarioService],
  controllers: [ContratoUsuarioController]
})
export class ContratoUsuarioModule {}
