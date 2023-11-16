import { Settings, Receipt, Gem } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title="Informazioni"
        description="Le tue informazioni"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <h1 className="text-lg font-bold flex items-center">
          <Gem className="mr-2" />
          Il tuo piano
        </h1>
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "Attualmente il tuo è un piano Pro."
            : "Attualmente il tuo è un piano Basic"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>

      <div className="px-4 lg:px-8 space-y-4 mt-10">
        <h1 className="text-lg font-bold flex items-center">
          <Receipt className="mr-2" />
          Le tue fatture
        </h1>
        <p className="text-sm">
          Qui trovi tutte le fatture in formato PDF, le fatture originali sono
          state consegnate nel tuo cassetto fiscale.
        </p>
        <ul>
          <li>01/23 - 100,00 €</li>
          <li>02/23 - 100,00 €</li>
          <li>03/23 - 100,00 €</li>
          <li>04/23 - 100,00 €</li>
          <li>05/23 - 100,00 €</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;
