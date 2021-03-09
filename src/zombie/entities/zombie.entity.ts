import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn, JoinTable,
} from 'typeorm';
import { ItemEntity } from '../../item/entities/item.entity';

@Entity('zombie')
export class ZombieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => ItemEntity)
  @JoinTable()
  item: ItemEntity[];
}
