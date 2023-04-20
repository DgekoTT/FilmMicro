import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Countries} from "./countries.model";



@Module({
  providers: [],
  controllers: [],
  imports: [SequelizeModule.forFeature([Countries]),
  ],

})
export class CountriesModule {}
