import { ChartContainer } from '@mui/x-charts/ChartContainer';
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';

const pData = [2400, 4800, 3600, 6000, 4800, 7200, 6000, 8400, 7200, 9600]; // Zigzag rising upwards
const xLabels = [
  'W1',
  'W4',
  'W10',
  'W15',
  'W20',
  'W25',
  'W30',
  'Page H',
  'Page I',
  'Page J',
];

export default function TinyLineChart() {
  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '300px' }}>
      <ChartContainer
        width={500}
        height={300}
        series={[{ type: 'line', data: pData }]}
        xAxis={[
          {
            scaleType: 'point',
            data: xLabels,
            label: 'X Axis Label',
          },
        ]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            stroke: '#8884d8',
            strokeWidth: 2,
          },
          [`& .${markElementClasses.root}`]: {
            stroke: '#8884d8',
            scale: '0.6',
            fill: '#fff',
            strokeWidth: 2,
          },
        }}
        disableAxisListener
      >
        <LinePlot />
        <MarkPlot />
      </ChartContainer>
    </div>
  );
}