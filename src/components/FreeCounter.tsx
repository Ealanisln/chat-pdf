"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "../../constants";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import axios from "axios";

interface FreeCounterProps {
  isPro: boolean;
  apiLimitCount: number;
}

export const FreeCounter = ({ apiLimitCount = 0, isPro }: FreeCounterProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Preguntas gratis.
            </p>
          </div>
          <Button
            onClick={handleSubscription}
            className="w-full"
            variant="premium"
          >
            Actualiza a Pro
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
