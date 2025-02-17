import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

type PlayerFeature = {
  name: string;
  value: number;
};

const playerFeatures: PlayerFeature[] = [
  { name: 'Atk', value: 30 },
  { name: 'Sht', value: 25 },
  { name: 'Pass', value: 20 },
  { name: 'Dfc', value: 15 },
  { name: 'Stm', value: 10 },
];

export default function PlayerFeaturesPieChart() {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => {
            const feature = item as unknown as PlayerFeature;
            return `${feature.name}: ${feature.value}%`;
          },
          arcLabelMinAngle: 10, // Reduce the minimum angle for labels
          arcLabelRadius: '70%', // Increase the radius for labels
          data: playerFeatures,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: 'bold',
        },
      }}
      width={400}
      height={300}
    />
  );
}