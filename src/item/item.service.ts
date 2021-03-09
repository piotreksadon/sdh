import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from './entities/item.entity';

const itemURL = 'https://zombie-items-api.herokuapp.com/api/items';
const nbpURL = 'http://api.nbp.pl/api/exchangerates/tables/C/today/';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}
  @Cron(`0 0 0 * * *`)
  async handleCron() {
    const itemsData = await axios.get(itemURL);
    const nbpData = await axios.get(nbpURL);
    const rates = nbpData.data[0].rates;
    const items = itemsData.data.items;
    const timestamp = itemsData.data.timestamp;

    const currencies = rates.filter((element) => {
      return element.code === 'EUR' || element.code === 'USD';
    });

    const usd = currencies[0];
    const euro = currencies[1];

    const priceUsd = { bid: usd.bid };
    const priceEur = { bid: euro.bid };

    const itemEntities = items.map((element) => {
      const date = new Date(+timestamp);
      const itemEntity = new ItemEntity();
      itemEntity.name = element.name;
      itemEntity.price = element.price;
      itemEntity.priceUsd = element.price / priceUsd.bid;
      itemEntity.priceEur = element.price / priceEur.bid;
      itemEntity.createdAt = date.toISOString().split('T')[0];

      return itemEntity;
    });
    await this.itemRepository.save(itemEntities);
  }

  async findOne(id: number) {
    return this.itemRepository.findOne(id);
  }

  findAll() {
    const date = new Date();
    return this.itemRepository.find({
      where: { createdAt: date.toISOString().split('T')[0] },
    });
  }
}
