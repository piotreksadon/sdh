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
  @Cron(`*/3 * * * * *`)
  async handleCron() {
    const itemsData = await axios.get(itemURL);
    const nbpData = await axios.get(nbpURL);
    const rates = nbpData.data[0].rates;
    const items = itemsData.data.items;
    console.log(items);

    const currencies = rates.filter((element) => {
      return element.code === 'EUR' || element.code === 'USD';
    });

    const usd = currencies[0];
    const euro = currencies[1];

    const priceUsd = { bid: usd.bid };
    const priceEur = { bid: euro.bid };

    const itemEntity = items.map((element) => {
      const itemEntity = new ItemEntity();
      itemEntity.name = element.name;
      itemEntity.price = element.price;
      itemEntity.priceUsd = element.price * priceUsd.bid;
      itemEntity.priceEur = element.price * priceEur.bid;

      return itemEntity;
    });
    console.log(itemEntity);
    await this.itemRepository.save(itemEntity);
  }
}
