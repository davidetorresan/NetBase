"use client";

import { Settings, Receipt, Gem, File } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoading)
    return (
      <div>
        <Heading
          title="Informazioni"
          description="Le tue informazioni"
          icon={Settings}
          iconColor="text-gray-700"
          bgColor="bg-gray-700/10"
        />
      </div>
    );
};

export default AdminPage;
