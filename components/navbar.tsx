import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={true} apiLimitCount={0} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
