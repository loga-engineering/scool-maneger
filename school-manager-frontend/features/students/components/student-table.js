"use client";

import {useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import {MaterialReactTable} from "material-react-table";
import {IconButton, Link, Stack, Tooltip} from "@mui/material";

import {studentConfig} from "@/features/students/student-config";
import {useSearch} from "@/shared/components/tables/table-hooks";
import {initialPagination} from "../../../shared/components/tables/table-utils";

const useColumns = () => useMemo(() => [
    {
        accessorKey: 'registrationNumber',
        header: 'Matricule',
    },
    {
        accessorKey: 'lastName',
        header: 'Nom',
    },
    {
        accessorKey: 'firstName',
        header: 'Prénom',
    },
    {
        accessorKey: 'dateOfBirth',
        header: 'Date de naissance',
    },
    {
        accessorKey: 'classroom.name',
        header: 'Classe',
    },
], []);


export default function StudentTable() {
    const [sort, setSort] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState(initialPagination);

    const {data: currentPage, isLoading, isError, error, refetch} = useSearch({
        query: globalFilter, page: pagination.pageIndex, size: pagination.pageSize, sort, filter: columnFilters,
        path: studentConfig.path.search
    });

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
                        children: error.message ,
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
                    <Link href={studentConfig.path.new}>
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



