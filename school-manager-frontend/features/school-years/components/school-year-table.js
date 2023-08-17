"use client";

import {useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import {MaterialReactTable} from "material-react-table";
import {IconButton, Link, Stack, Tooltip} from "@mui/material";

import {schoolYearConfig} from "../school-year-config";
import {useSearchSchoolYears} from "../school-year-services";
import {initialPagination} from "../../../shared/components/tables/table-utils";

const useColumns = () => useMemo(() => [
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
], []);


export default function SchoolYearTable() {
    const [sort, setSort] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState(initialPagination);

    const {data: currentPage, isLoading, isError, error, refetch} = useSearchSchoolYears({
            query: globalFilter, page: pagination.pageIndex, size: pagination.pageSize, sort, filter: columnFilters
    });

    console.log({currentPage});

    const columns = useColumns();

    return (
        <MaterialReactTable
            columns={columns}
            data={currentPage?.content ?? []} //data is undefined on first render
            initialState={{showColumnFilters: true}}
            onSortingChange={setSort}
            onPaginationChange={setPagination}
            rowCount={currentPage?.totalElements}
            onGlobalFilterChange={setGlobalFilter}
            onColumnFiltersChange={setColumnFilters}
            manualFiltering manualPagination manualSorting
            state={{
                isLoading,
                pagination,
                columnFilters,
                globalFilter,
                showAlertBanner: isError,
                showProgressBars: isLoading,
                sort,
            }}
            muiToolbarAlertBannerProps={
                isError
                    ? {
                        color: 'error',
                        children: 'Error loading data', // TODO: Show the message containing in error object
                    }
                    : undefined
            }
            renderTopToolbarCustomActions={() => (
                <Stack direction={"row"}>
                    <Tooltip arrow title="Actualiser">
                        <IconButton onClick={refetch}>
                            <Refresh/>
                        </IconButton>
                    </Tooltip>
                    <Link href={schoolYearConfig.path.new}>
                        <Tooltip arrow title="Ajouter">
                            <IconButton>
                                <Add/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Stack>
            )}
        />
    );
};



