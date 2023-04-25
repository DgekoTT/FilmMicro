import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./film.model";
import {Actors} from "../actors/actors.model";




@Table({tableName: 'ActorsFilm', createdAt: false, updatedAt: false})//появится таблица с именем ActorsFilm
export class ActorsFilm extends Model<ActorsFilm> {


    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
        //получим id как число, уникальное автозаполнение 1..2..3
    id: number;

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number;

    @ForeignKey(() => Actors)
    @Column({type: DataType.INTEGER})
    actorId: number;

}