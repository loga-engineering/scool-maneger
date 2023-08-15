"use client";

import React, {useMemo, useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {IconButton, Tooltip} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {QueryClient, QueryClientProvider, useQuery,} from '@tanstack/react-query';
import {useSearchSchoolYears} from "@/features/school-years/school-year-services";

const Example = () => {
    const [columnFilters, setColumnFilters] = useState([]);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState([]);

    const [pagination, setPagination] = useState({
        pageIndex: 1,
        pageSize: 10
    });
    const {data: currentValue, isLoading, isError, error, refetch} = useSearchSchoolYears({query,page: pagination.pageIndex,size:pagination.pageSize,sort});

    console.log({currentValue});

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'year',
                header: 'Année',
            },
            {
                accessorKey: 'startDate',
                header: 'Date de début',
            },
            {
                accessorKey: 'endDate',
                header: 'Date de fin',
            },
        ],
        [],
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={currentValue?.content ?? []} //data is undefined on first render
            initialState={{ showColumnFilters: true }}
            manualFiltering
            manualPagination
            manualSorting
            muiToolbarAlertBannerProps={
                isError
                    ? {
                        color: 'error',
                        children: 'Error loading data',
                    }
                    : undefined
            }
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={setQuery}
            onPaginationChange={setPagination}
            onSortingChange={setSort}
            renderTopToolbarCustomActions={() => (
                <Tooltip arrow title="Refresh Data">
                    <IconButton onClick={refetch}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            )}
            rowCount={currentValue?.totalRowCount ?? 0}
            state={{
                columnFilters,
                globalFilter:query,
                isLoading,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isLoading,
                sorting:sort,
            }}
        />
    );
};

const queryClient = new QueryClient();

const ExampleWithReactQueryProvider = () => (
    <QueryClientProvider client={queryClient}>
        <Example />
    </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;


