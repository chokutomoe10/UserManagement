import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "products" })
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    status: string

    @Column({type:"timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date
}
