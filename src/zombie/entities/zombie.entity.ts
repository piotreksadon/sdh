import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ItemEntity } from '../../item/entities/item.entity';

@Entity('zombie')
export class ZombieEntity {
  @PrimaryGeneratedColumn()
  zombie_id: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: false, type: `datetime` })
  created_at: string;

  @OneToMany(() => ItemEntity, (item) => item_id.zombie_id)
  item: ItemEntity[];
}
