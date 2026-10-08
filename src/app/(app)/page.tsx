import { Suspense } from 'react';
import { PlantsPage } from '@/components/plants/PlantsPage/PlantsPage';

export default function PlantsHome() {
  return (
    <Suspense>
      <PlantsPage />
    </Suspense>
  );
}
