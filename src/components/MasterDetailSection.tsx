import React, { useState } from 'react';
import { ActivityList } from './ActivityList';
import { DetailView } from './DetailView';

interface MasterDetailSectionProps {
  activities: Array<{
    text: string;
    duration: number;
  }>;
  type: 'master' | 'sub';
}

export const MasterDetailSection: React.FC<MasterDetailSectionProps> = ({
  activities,
  type
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ActivityList
        activities={activities}
        onSelect={setSelectedIndex}
        selectedIndex={selectedIndex}
        type={type}
      />
      <DetailView
        activity={selectedIndex !== null ? activities[selectedIndex] : null}
        type={type}
      />
    </div>
  );
};