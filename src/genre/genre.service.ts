
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Genres} from "./genre.model";
import {CreateGenreDto} from "./dto/create.genre.dto";
import {UpdateGenreDto} from "./dto/update.genre.dto";


@Injectable()
export class GenreService {

    constructor(@InjectModel(Genres) private genreRepository: typeof Genres) {
    }
    async createGenre(dto: CreateGenreDto) {
        const role = await this.genreRepository.create(dto);
        return role;
    }

    async getGenreById(id: number) {
        const role = await this.genreRepository.findOne({where: {id}});
        return role;
    }

    async getAllGenres() {
        const allGenres= await this.genreRepository.findAll();
        return allGenres;
    }

    async updateGenre(dto: UpdateGenreDto) {
        let genre = await this.genreRepository.findOne({where: {id: dto.id}});
        this.checkerGenre(genre);
    }


    checkerGenre(genre:any) {
        if (!genre) {
            throw new HttpException('Профиль с данным id не найден', HttpStatus.NOT_FOUND)
        }
    }
}