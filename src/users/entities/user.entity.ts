import { Alamat } from '#/alamat/entities/alamat.entity';
import { GroomingReservation } from '#/grooming-reservation/entities/grooming-reservation.entity';
import { GroomingReservationService } from '#/grooming-reservation/grooming-reservation.service';
import { Role } from '#/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => GroomingReservation, (reserveGroom) => reserveGroom.user, {})
  reserveGroom: GroomingReservation[];
  
  @OneToOne(() => Alamat, alamat => alamat.user)
  alamatPick: Alamat[];
  
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date;

  @VersionColumn()
  version: number;
}
