import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ItemEntity } from '../../item/entities/item.entity';

@Entity('zombie')
export class ZombieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: false, type: `datetime` })
  created_at: string;

  @ManyToMany(() => ItemEntity)
  item: ItemEntity[];
}
