import { DashboardWidget } from '@/components/dashboard-widget';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="shadow-2xl shadow-black/50">
        <DashboardWidget />
      </div>
    </main>
  );
}
