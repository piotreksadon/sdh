import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ZombieEntity } from '../../zombie/entities/zombie.entity';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: `varchar`, length: 100 })
  name: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ nullable: false, type: `integer`, name: 'price_usd' })
  priceUsd: number;

  @Column({ nullable: false, type: `integer`, name: 'price_Eu' })
  priceEur: number;

  @Column({ nullable: false, type: `integer`, name: 'price_pln' })
  price: number;

  @ManyToMany(() => ZombieEntity)
  @JoinTable()
  zombie: ZombieEntity[];
}
