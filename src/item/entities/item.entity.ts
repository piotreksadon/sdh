import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: false, type: `datetime` })
  created_at: string;

  @Column({ nullable: false, type: `integer` })
  price_usd: number;

  @Column({ nullable: false, type: `integer` })
  price_eu: string;

  @Column({ nullable: false, type: `integer` })
  price_pln: string;
}
