import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ReportingBarChart() {

    return (

        <BarChart
            xAxis={[{ scaleType: 'band', data: ['2018','2019','2020','2021','2022','2023'], valueFormatter: (value) => value.toString(), }]}
            series={[{ data: [120, 160, 250, 300, 370, 450] }]}
            width={500}
            height={300}
        />

    );
}