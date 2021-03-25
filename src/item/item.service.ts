import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from './entities/item.entity';
import { Cron } from '@nestjs/schedule';


@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {
  }

  // @Cron(`0 0 0 * * *`)
  @Cron(`*/8 * * * * *`)
  async handleCron() {
    const getNbpData = axios.get('http://api.nbp.pl/api/exchangerates/tables/C/today/')
    const getItemData = axios.get('https://zombie-items-api.herokuapp.com/api/items')

    const result = await Promise.all([getNbpData, getItemData])
    const currencies = this.isSaturdayOrSunday()
      ? this.getMockedNbpData()
      : await this.getCurrencies(result[0]);

    const itemEntities = await this.getItems(result[1], currencies);

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

  private async getCurrencies(nbpData): Promise<{ usd: any; euro: any }> {
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

  async getItems(itemsData, currencies: {
    usd: { bid: number };
    euro: { bid: number };
  }): Promise<ItemEntity> {
    const items = itemsData.data.items;
    const timestamp = itemsData.data.timestamp;

    return items.map((item) => {
      const date = new Date(+timestamp);
      const itemEntity = new ItemEntity();
      itemEntity.name = item.name;
      itemEntity.price = item.price;
      itemEntity.priceUsd = item.price / currencies.usd.bid;
      itemEntity.priceEur = item.price / currencies.euro.bid;
      itemEntity.createdAt = date.toISOString().split('T')[0];

      return itemEntity;
    });
  }
}
