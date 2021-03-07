import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zombies')
export class ZombiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  name: string;
}
