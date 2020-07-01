import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedValue: string;
  thumbnail_url: string;
}

interface Extras {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Order {
  id: number;
  product_id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  thumbnail_url: string;
  extras: Extras[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const response = await api.get<Order[]>('/orders');
      const ordersArray: Food[] = [];

      const { data } = response;

      data.forEach(iten => {
        ordersArray.push({
          id: iten.id,
          name: iten.name,
          description: iten.description,
          price: iten.price,
          formattedValue: formatValue(iten.price),
          thumbnail_url: iten.thumbnail_url,
        });
      });

      setOrders(ordersArray);
    }

    loadOrders();
  }, [setOrders]);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.formattedValue}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
