import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: string
}