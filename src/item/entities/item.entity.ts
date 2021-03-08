import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ZombieEntity } from '../../zombie/entities/zombie.entity';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column({ nullable: false, type: `varchar`, length: 100 })
  name: string;

  @Column({ nullable: false, type: `datetime` })
  created_at: string;

  @Column({ nullable: false, type: `integer` })
  price_usd: number;

  @Column({ nullable: false, type: `integer` })
  price_eu: string;

  @Column({ nullable: false, type: `integer` })
  price_pln: string;

  @ManyToOne(() => ZombieEntity, zombie =>zombie.item)
  item: ZombieEntity;
}
