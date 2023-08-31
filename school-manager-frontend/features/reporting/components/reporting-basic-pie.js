import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function ReportingBasicPie() {

    return (
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 15, label: 'Diplomé' },
                            { id: 1, value: 20, label: 'Mentions' },
                            { id: 2, value: 10, label: 'Redouble' },
                        ],
                    },
                ]}
                width={350}
                height={300}
            />

    );
}
