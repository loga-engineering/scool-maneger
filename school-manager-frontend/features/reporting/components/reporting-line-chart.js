import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function ReportingLineChart() {

    const years = [
        new Date(2018, 0, 1),
        new Date(2019, 0, 1),
        new Date(2020, 0, 1),
        new Date(2021, 0, 1),
        new Date(2022, 0, 1),
        new Date(2023, 0, 1),
    ];

    const yearFormater = (date) => date.getFullYear().toString();

    return (
            <LineChart
                xAxis={[{ data: years, scaleType: 'time', valueFormatter: yearFormater,}]}
                series={[
                    {
                        data: [120, 160, 250, 300, 370, 450], label:"Mrd$",
                    },
                ]}
                width={400}
                height={200}
            />
    );
}