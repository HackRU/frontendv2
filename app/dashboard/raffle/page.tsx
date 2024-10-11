'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/dashboard/components/card';
import { Button } from '@/app/dashboard/components/button';
import { Input } from '@/app/dashboard/components/input';

interface RafflePrize {
  id: string;
  userBuyIn: number;
}

const POINT_LIMIT = 100; // Set the total point limit (for now)

export default function RafflePage() {
  const [raffleItems, setRaffleItems] = useState<RafflePrize[]>([]);
  const [remainingPoints, setRemainingPoints] = useState(POINT_LIMIT);
  const [totalPoints, setTotalPoints] = useState(POINT_LIMIT);
  const [currentBuyPoints, setCurrentBuyPoints] = useState(0);

  useEffect(() => {
    // Mock function to fetch raffle items
    const fetchRaffleItems = async () => {
      // Simulating API call
      const mockItems: RafflePrize[] = [
        { id: '1', userBuyIn: 0 },
        { id: '2', userBuyIn: 0 },
        { id: '3', userBuyIn: 0 },
      ];
      setRaffleItems(mockItems);
    };

    fetchRaffleItems();
  }, []);

  const handleBuyInChange = (id: string, value: string) => {
    let newValue: number;

    if (value === '') {
      newValue = 0;
    } else {
      newValue = Math.max(
        0,
        Math.min(
          parseInt(value, 10),
          remainingPoints +
            (raffleItems.find((item) => item.id === id)?.userBuyIn ?? 0),
        ),
      );
    }

    const updatedItems = raffleItems.map((item) =>
      item.id === id ? { ...item, userBuyIn: newValue } : item,
    );

    const newCurrentBuyPoints = updatedItems.reduce(
      (sum, item) => sum + item.userBuyIn,
      0,
    );

    setRaffleItems(updatedItems);
    setCurrentBuyPoints(newCurrentBuyPoints);
    setRemainingPoints(POINT_LIMIT - newCurrentBuyPoints);
  };

  const handleSubmit = () => {
    console.log('Submitting raffle entries:', raffleItems);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-12 mt-24 text-center text-7xl font-bold text-white">
        Raffle Prizes!
      </h1>

      <div className="mb-4 text-center text-white">
        <p className="mb-2 text-3xl font-bold">
          Total Points You Earned: {totalPoints}
        </p>
        <p className="mb-2 text-3xl font-bold">
          Current Buy Points: {currentBuyPoints}
        </p>
        <p
          className={`mb-2 text-3xl font-bold ${remainingPoints === 0 ? 'text-red-500' : ''}`}
        >
          Remaining Points: {remainingPoints}
        </p>
      </div>
      <div className="mb-4 flex justify-center">
        <Button onClick={handleSubmit} className="text-lg">
          Submit Entries
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {raffleItems.map((item) => (
          <Card key={item.id} className="w-full">
            <CardHeader>
              <CardTitle>Prize {item.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={item.userBuyIn || ''}
                  onChange={(e) => handleBuyInChange(item.id, e.target.value)}
                  min="0"
                  max={remainingPoints + item.userBuyIn}
                  className="mx-auto w-40"
                />
                <span>Points</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
