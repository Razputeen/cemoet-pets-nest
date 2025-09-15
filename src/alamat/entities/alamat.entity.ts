import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from '#/users/entities/user.entity';

@Entity()
export class Alamat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  locationName: string;

  @Column()
  penerima: string;

  @Column()
  alamat: string;

  @ManyToOne(() => User, (user) => user.alamatPick, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  // ✅ alamat aktif atau tidak (bisa dipake buat soft disable alamat)
  @Column({ default: true })
  isActive: boolean;

  // ✅ alamat terpilih sebagai default
  @Column({ default: false })
  isSelected: boolean;

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
