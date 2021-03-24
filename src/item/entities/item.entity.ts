import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ZombieEntity } from '../../zombie/entities/zombie.entity';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: `varchar`, length: 100 })
  name: string;

  @Column({ nullable: false, type: 'date', name: 'created_at' })
  createdAt: string;

  @Column({ nullable: false, type: `integer`, name: 'price_usd' })
  priceUsd: number;

  @Column({ nullable: false, type: `integer`, name: 'price_Eu' })
  priceEur: number;

  @Column({ nullable: false, type: `integer`, name: 'price_pln' })
  price: number;

  @ManyToMany(() => ZombieEntity)
  zombie: ZombieEntity[];
}
