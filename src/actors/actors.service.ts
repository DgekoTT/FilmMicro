

import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Actors} from "./actors.model";
import {CreateActorDto} from "./dto/create-actor.dto";
import {Op} from "sequelize";



@Injectable()
export class ActorsService{

    constructor(@InjectModel(Actors) private actorsRepository: typeof Actors) {}

    async createActor(dto: CreateActorDto) {
        //создаем актера
        const actor = await this.actorsRepository.create(dto);
        return actor;
    }

    async getActors(actors: string[]){
        let actorsInDb = await this.actorsRepository.findAll({
            where: {
                name: { [Op.in]: actors[0].split(',') }
            }
        })
        return actorsInDb;
    }

    async getActorByValue(value: string) {
        const actor = await this.actorsRepository.findOne({where: {value}});
        return actor;
    }

    async checkActors(actors: string[]) {
        const newActors = actors[0].split(',');
        const newActorsEn = actors[1].split(',');
        let lastActors = await this.getActors(newActors);
        let actorsForCreation = await this.findMissingActors(newActors);
        let createdActors = await this.createNewActors(actorsForCreation, newActors, newActorsEn);
        let allActors = lastActors.concat(createdActors)
        return allActors;
    }

    async createNewActors(actorsForCreation: string[],newActors: string[], newActorsEn: string[]) {
        let createdActors = [];
        for (let actor in actorsForCreation) {
            let position = newActors.indexOf(actor);
            let actorEn = newActorsEn[position];
            let dto = {name: actor, nameEnglish: actorEn};
            let created = await this.createActor(dto);
            createdActors.push(created);
        }
        return createdActors;
    }

    async findMissingActors(newActors: string[]): Promise<string[]> {
        const dbActors = await this.actorsRepository.findAll({ attributes: ['name'] });
        const missingActors = [];

        for (const actor of newActors) {
            const foundElement = dbActors.find((dbActors) => dbActors.name === actor);
            if (!foundElement) {
                missingActors.push(actor);
            }
        }

        return missingActors;
    }
}
