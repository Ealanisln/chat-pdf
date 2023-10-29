"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModal } from "../../hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export const ProModal = () => {
  const proModal = useProModal();
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


  const closeModal = () => {
    proModal.onClose(); // Call the onClose function to close the modal
  };
  
  return (
    <Dialog open={proModal.isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Actualiza a
              <Badge className="uppercase text-sm py-1" variant="premium">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            <Card className="p-3 border-black/5">
              <div className="flex flex-col items-center justify-center">
                <CardHeader>
                  <CardTitle>Uso ilimitado</CardTitle>
                  <CardDescription>
                    Accede a todos nuestros beneficios ahora.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Consultas ilimitadas</p>
                  <p>Consultas ilimitadas</p>
                  <p>Consultas ilimitadas</p>
                </CardContent>
              </div>
            </Card>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={loading} onClick={handleSubscription} size="lg" variant="premium" className="w-full ">
            Mejora a PRO ahora!
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
