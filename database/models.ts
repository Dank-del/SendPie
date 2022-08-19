import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
    @Column({primaryKey: true})
    username: string

    @Column
    password: string

    @Column
    email: string

    @Column
    currentLocation: string
}

@Table
export class Shops extends Model {
    @Column({primaryKey: true})
    shopName: string

    @Column
    shopLocation: string
}