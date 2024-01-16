"use client";

import { Settings, Receipt, Gem, File } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { useEffect, useState } from "react";
import Stripe from "stripe";

const SettingsPage = () => {
  const [isPro, setIsPro] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const checkIsPro = async () => {
    setIsLoading(true);
    let res = await checkSubscription();
    setIsPro(res);
    console.log(res);
    setIsLoading(false);
  };

  useEffect(() => {
    checkIsPro();
  }, []);

  return (
    <div>
      <Heading
        title="Informazioni"
        description="Le tue informazioni"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-6">
        <h1 className="text-lg font-bold flex items-center">
          <Gem className="mr-2" />
          Il tuo piano
        </h1>
        {!isLoading ? (
          <>
            <div className="space-y-4">
              <div className="text-muted-foreground text-sm">
                {isPro?.isValid
                  ? "Attualmente il tuo è un piano Pro."
                  : "Attualmente il tuo è un piano Basic"}
              </div>
              <div className="text-muted-foreground text-sm">
                {isPro?.isValid && isPro?.isCanceled
                  ? "Il tuo piano PRO terminerà il " + isPro?.periodEnd
                  : "Il tuo piano si rinnoverà automaticamente il " +
                    isPro?.periodEnd}
              </div>
              <SubscriptionButton isPro={isPro?.isValid} />
            </div>
            <div className="space-y-4">
              <h1 className="text-lg font-bold flex items-center">
                <File className="mr-2" />
                Le tue fatture
              </h1>
              <ul className="list-disc">
                {isPro?.invoices.map((item: any, i: Number) => (
                  <li className="flex flex-row items-center">
                    <a href={item.invoice_pdf} download className="mr-2">
                      {"#"}
                      {item.number}
                    </a>
                    <p>{new Date(item.created).toLocaleDateString("it-IT")}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">
            Cariamento in corso...
          </p>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
