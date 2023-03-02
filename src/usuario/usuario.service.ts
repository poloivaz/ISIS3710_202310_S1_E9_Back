import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException, NotFoundErrorMessage } from '../shared/errors/business-errors';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

    async findAll(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find({ relations: ["necesidades", "especialidades", "reseniasRecibidas", "reseniasEscritas", "antecedentes", "contratos", "ofertas"] });
    }

    async findOne(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["necesidades", "especialidades", "reseniasRecibidas", "reseniasEscritas", "antecedentes", "contratos", "ofertas"] } );
        if (!usuario)
          throw new BusinessLogicException(NotFoundErrorMessage("usuario"), BusinessError.NOT_FOUND);
   
        return usuario;
    }

    async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if(usuario.tipoUsuario.toLowerCase() != "canguro" && usuario.tipoUsuario.toLowerCase() != "acudiente" && usuario.tipoUsuario.toLowerCase() != "ambos")
            throw new BusinessLogicException("El tipo de usuario debe ser 'canguro', 'acudiente' o 'ambos'", BusinessError.PRECONDITION_FAILED);
        if(!usuario.cedula || !usuario.contrasenia || !usuario.nombre)
            throw new BusinessLogicException("El usuario debe tener minimo una cedula, una contrasenia y un nombre", BusinessError.PRECONDITION_FAILED);

        return await this.usuarioRepository.save(usuario);
    }

    async update(id: string, usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const persistedUsuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}});
        if (!persistedUsuario)
          throw new BusinessLogicException(NotFoundErrorMessage("usuario"), BusinessError.NOT_FOUND);

        return await this.usuarioRepository.save({...persistedUsuario, ...usuario});
    }

    async delete(id: string) {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}});
        if (!usuario)
          throw new BusinessLogicException(NotFoundErrorMessage("usuario"), BusinessError.NOT_FOUND);
     
        await this.usuarioRepository.remove(usuario);
    }

}
