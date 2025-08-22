import { User } from '#/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: string

    @Column({default: 'user'})
    name: string

    @OneToMany(() => User, user => user.role)
    users: User[]
}
