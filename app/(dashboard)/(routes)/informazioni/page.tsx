
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

     
    </div>
  );
};

export default SettingsPage;
