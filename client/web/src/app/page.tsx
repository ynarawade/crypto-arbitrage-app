import UsdtInrArbitrageTable from "@/components/ArbitrageTable/usdt-inr/UsdtInrArbiTable";
import ArbitrageTable from "@/components/ArbitrageTable/usdt-usdt/ArbitrageTable";

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 my-6">
      {/* <ArbitrageTable /> */}
      <UsdtInrArbitrageTable />
    </div>
  );
}
