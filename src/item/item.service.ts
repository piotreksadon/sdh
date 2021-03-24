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

  // @Cron(`0 0 0 * * *`)
  // @Cron(`*/8 * * * * *`)
  async handleCron() {
    const currencies = this.isSaturdayOrSunday()
      ? this.getMockedNbpData()
      : await this.getCurrencies();

    const itemEntities = await this.getItems(currencies);

    await this.itemRepository.save(itemEntities);
  }

  private isSaturdayOrSunday() {
    const currentDay = this.getCurrentDay();
    return 0 === currentDay || 6 === currentDay;
  }

  private getMockedNbpData() {
    return {
      euro: { bid: 4 },
      usd: { bid: 3 },
    };
  }

  private getCurrentDay(): number {
    const todayDate = new Date();
    return todayDate.getDay();
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

  private async getCurrencies(): Promise<{ usd: any; euro: any }> {
    const nbpData = await axios.get(nbpURL);
    const rates = nbpData.data[0].rates;

    const currencies = rates.filter((element) => {
      return element.code === 'EUR' || element.code === 'USD';
    });

    const usd = currencies[0];
    const euro = currencies[1];

    return {
      usd: usd,
      euro: euro,
    };
  }

  async getItems(currencies: {
    usd: { bid: number };
    euro: { bid: number };
  }): Promise<ItemEntity[]> {
    const itemsData = await axios.get(itemURL);
    const items = itemsData.data.items;
    const timestamp = itemsData.data.timestamp;

    const itemEntities = items.map((item) => {
      const date = new Date(+timestamp);
      const itemEntity = new ItemEntity();
      itemEntity.name = item.name;
      itemEntity.price = item.price;
      itemEntity.priceUsd = item.price / currencies.usd.bid;
      itemEntity.priceEur = item.price / currencies.euro.bid;
      itemEntity.createdAt = date.toISOString().split('T')[0];

      return itemEntity;
    });

    return itemEntities;
  }
}
