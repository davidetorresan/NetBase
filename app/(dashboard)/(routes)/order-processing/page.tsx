import { Settings, Receipt, Gem, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderProcessing = async () => {
  return (
    <div className="w-full h-full md:p-20 px-6 bg-[#111827] text-white">
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Benvenuto/a, ci siamo quasi!
        </h1>
        <p className="text-center text-sm md:text-lg mt-5">
          E&apos; il momento di acquistare il pacchetto di NetBase&trade;
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
              Il tuo gestionale per gestire al meglio le tue vendite (Soon)
            </small>
          </p>
          <p className="mt-5 flex items-center flex-col">
            <Zap className="w-4 h-4 ml-2 fill-white mr-2" />
            <span className="font-bold">NetGPT&trade;</span>
            <small>La tua AI dedicato al mondo del Marketing</small>
          </p>
          <p className="mt-5 flex items-center flex-col">
            <Zap className="w-4 h-4 ml-2 fill-white mr-2" />
            <span className="font-bold">NetCAL&trade;</span>
            <small>
              Il tuo calendario completamente integrato nel tuo CRM. (Soon)
            </small>
          </p>
          <p className="mt-5 flex items-center flex-col">
            <Zap className="w-4 h-4 ml-2 fill-white mr-2" />
            <span className="font-bold">Supporto Prioritario</span>
            <small>Supporto con chat live</small>
          </p>
        </div>
        <Button
          disabled={false}
          onClick={() => {}}
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
};

export default OrderProcessing;
