import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zombie-item')
export class ZombieItemEntity {
  @PrimaryGeneratedColumn()
  zombie_id: number;

  @Column({ nullable: false, type: 'integer' })
  item_id: number;
}
