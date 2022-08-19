import { Sequelize } from "sequelize-typescript";
import { Shops, User } from "./models";

export const sequelizeClient = new Sequelize('sqlite://database.db');

sequelizeClient.addModels([User, Shops]);