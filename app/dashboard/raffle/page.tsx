'use client';

import { Button } from '@/app/dashboard/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/dashboard/components/card';
import { Input } from '@/app/dashboard/components/input';
import { GetBuyIns, GetPoints, UpdateBuyIns } from '@/app/lib/api/actions';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface RafflePrize {
  id: string;
  totalBuyIn: number;
  userBuyIn: number;
}

interface RaffleRequestResponse {
  statusCode: number;
  buyIns: Record<string, number>;
}

interface PointsRequestResponse {
  balance: number;
  total_points: number;
  buy_ins: {
    buy_in: number;
    prize_id: string;
  }[];
}

interface PrizeInfo {
  name: string;
  description: string;
}

const prizeMapping: Record<string, PrizeInfo> = {
  amazon: {
    name: 'Amazon Gift Card',
    description: '$50 Dollar Amazon Gift Card',
  },
  matcha: {
    name: 'Matcha Kit',
    description: 'Starter Matcha Kit with Matcha Powder and Whisker',
  },
  blanket: {
    name: 'Weighted Blanket',
    description: '20 Pound Weighted Blanket',
  },
};

/*
* Note to future (Kevin):
  The responses from action.ts seem to not be typed correctly and consistently.
*/

export default function RafflePage() {
  const [raffleItems, setRaffleItems] = useState<RafflePrize[]>([]);
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [currentBuyPoints, setCurrentBuyPoints] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [raffleRequest, pointsRequest] = await Promise.all([
          GetBuyIns(),
          GetPoints(),
        ]);

        const raffleResponseBody =
          raffleRequest.response as unknown as RaffleRequestResponse;
        const pointsResponseBody =
          pointsRequest.response as unknown as PointsRequestResponse;

        const buyInData = raffleResponseBody.buyIns;
        const userBuyIns = pointsResponseBody.buy_ins.reduce(
          (acc, item) => {
            acc[item.prize_id] = item.buy_in;
            return acc;
          },
          {} as Record<string, number>,
        );

        const prizeData = Object.keys(buyInData).map((id) => ({
          id,
          totalBuyIn: buyInData[id],
          userBuyIn: userBuyIns[id] || 0,
        }));

        prizeData.sort((a, b) => a.id.localeCompare(b.id));

        const totalUserBuyIns = prizeData.reduce(
          (sum, item) => sum + item.userBuyIn,
          0,
        );
        setRaffleItems(prizeData);
        setTotalPoints(pointsResponseBody.total_points);
        setCurrentBuyPoints(totalUserBuyIns);
        setRemainingPoints(pointsResponseBody.total_points - totalUserBuyIns);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
    setRemainingPoints(totalPoints - newCurrentBuyPoints);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      console.log('Submitting raffle entries:', raffleItems);

      const buyIns = raffleItems.map((item) => ({
        prize_id: item.id,
        buy_in: item.userBuyIn,
      }));

      const response = await UpdateBuyIns(buyIns);
      console.log(response.response);
      if (response.error) {
        throw new Error(response.error);
      }

      setSubmitMessage({
        type: 'success',
        text: 'Entries submitted successfully!',
      });
    } catch (error) {
      console.error(error);
      console.error(
        "Check the user's prize document. Make sure the array of prize_ids are the same as what is included in the request.",
      );
      setSubmitMessage({
        type: 'error',
        text: 'Failed to submit entries. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-full w-full items-center justify-center p-4">
        <div className="text-xl text-white">Loading raffle dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-12 mt-24 text-center text-7xl font-bold text-white">
        Raffle Prizes!
      </h1>

      <div className="mb-8 text-center">
        <Link href="/dashboard">
          <Button className="text-lg">Back to Dashboard</Button>
        </Link>
      </div>

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
      <div className="mb-4 flex flex-col items-center">
        <Button
          onClick={handleSubmit}
          className="mb-2 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Entries'}
        </Button>
        <br />
        {submitMessage && (
          <div
            className={`text-${submitMessage.type === 'success' ? 'green' : 'red'}-500`}
          >
            {submitMessage.text}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {raffleItems.map((item) => (
          <Card key={item.id} className="w-full">
            <CardHeader>
              <CardTitle>
                {prizeMapping[item.id]?.name || `Prize ${item.id}`}
              </CardTitle>
              <CardDescription>
                {prizeMapping[item.id]?.description ||
                  'Description not available'}
              </CardDescription>
              <CardDescription>
                Total Buy In: {item.totalBuyIn + item.userBuyIn} Points
              </CardDescription>
              <CardDescription>
                Probability of winning:{' '}
                {item.userBuyIn > 0
                  ? (
                      (item.userBuyIn / (item.totalBuyIn + item.userBuyIn)) *
                      100
                    ).toFixed(2) + '%'
                  : '0%'}
              </CardDescription>
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
