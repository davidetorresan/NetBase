"use client";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { useRouter } from "next/navigation";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProModal } from "./pro-modal";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let active;

  const [loading, setLoading] = useState(false);
  const [isActive, setActive] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const userSubscription = async () => {
    let res = await axios.get("/api/subscription");
    setActive(res.data.active);
    console.log("QUI", isActive);
  };

  useEffect(() => {
    userSubscription();
  }, []);

  if (isActive) return <>{children}</>;

  if (!isActive) {
    return (
      <div className="w-full h-full md:p-20 px-6 bg-[#111827] text-white">
        <div className="w-full flex justify-center items-center flex-col">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Benvenuto/a, ci siamo quasi!
          </h1>
          <p className="text-center text-sm md:text-lg mt-5">
            E' il momento di acquistare il pacchetto di NetBase&trade;
          </p>
        </div>
        <div className="my-5 w-full flex items-center justify-center flex-col">
          <div className="border-[1px] border-solid mb-5 md:w-[50%] w-full pb-10 rounded-md flex items-center justify-center flex-col text-center">
            <Button
              disabled={false}
              size="lg"
              variant="premium"
              className="w-full mb-8 text-md cursor-default"
            >
              <b>NetBase&trade;</b> Early-PRO Package
            </Button>
            <h2 className="text-4xl font-bold">
              €19,99<small className="font-light">/mese</small>
            </h2>
            <p className="text-[11px]">Fatturati annualmente: €239,88/anno</p>
            <p className="mt-5 flex items-center flex-col">
              <Zap className="w-4 h-4 ml-2 fill-white mr-2" />
              <span className="font-bold">NetCRM&trade;</span>
              <small>
                Il tuo gestionale per gestire al meglio le tue vendite
              </small>
            </p>
            <p className="mt-5 flex items-center flex-col">
              <Zap className="w-4 h-4 ml-2 fill-white mr-2" />
              <span className="font-bold">NetGPT&trade;</span>
              <small>La tua AI dedicato al mondo del Network Marketing</small>
            </p>
            <p className="mt-5 flex items-center flex-col">
              <Zap className="w-4 h-4 ml-2 fill-white mr-2" />
              <span className="font-bold">NetCAL&trade;</span>
              <small>
                Il tuo calendario completamente integrato nel tuo CRM.
              </small>
            </p>
            <p className="mt-5 flex items-center flex-col">
              <Zap className="w-4 h-4 ml-2 fill-white mr-2" />
              <span className="font-bold">Supporto Prioritario</span>
              <small>Supporto con chat live</small>
            </p>
          </div>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="md:w-[50%] w-full"
          >
            Acquista ora!
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </div>
        <p className="text-center text-[12px]">
          &copy; 2023 NetBase&trade; - A trademark of Worth Group&trade; - All
          right are reserved
        </p>
      </div>
    );
  }
};
