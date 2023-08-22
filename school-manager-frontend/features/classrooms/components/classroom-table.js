"use client";

import React, {useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import {MaterialReactTable} from "material-react-table";
import {Box, Button, IconButton, Link, MenuItem, Stack, Tooltip} from "@mui/material";

import {classroomConfig} from "@/features/classrooms/classroomConfig";
import {useSearch} from "@/shared/components/tables/table-hooks";
import ActionMenuItems, {initialPagination} from "../../../shared/components/tables/table-utils";
import {useRecoilState, useRecoilValue} from "recoil";
import {classroomQueryState} from "@/features/classrooms/classroom-services";
import {studentQueryState} from "@/features/students/student-services";
import {studentConfig} from "@/features/students/student-config";
import {useRouter} from "next/navigation";
import ClassroomDelete from "@/features/classrooms/components/classroom-delete";

const useColumns = () => useMemo(() => [

    {
        accessorKey: 'name',
        header: 'Nom',
    },
    {
        accessorKey: 'level',
        header: 'Niveau',
    },
    {
        accessorKey: 'headTeacherName',
        header: 'Prof. Titulaire',
    },
    {
        accessorKey: 'schoolYear.year',
        header: 'Année scolaire',
    },
], []);


export default function ClassroomTable() {

    const [sort, setSort] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState(initialPagination);

    const classroomQuery = useRecoilValue(classroomQueryState);
    const [columnFilters, setColumnFilters] = useState([
        {id: 'schoolYear.year', value: classroomQuery.query}]);

    const {data: currentPage, isLoading, isError, error, refetch} = useSearch({
            query: globalFilter, page: pagination.pageIndex, size: pagination.pageSize, sort, filter: columnFilters,
            path: classroomConfig.path.search
    });

    const [studentQuery, setStudentQuery] = useRecoilState(studentQueryState);
    const router = useRouter();
    const handleRowClick = (name) => {
        setStudentQuery((prevState) => ({
            ...prevState,
            query: name,
            listView: 1,
        }));
        router.push(studentConfig.path.root);
    };

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
            enableRowActions
            positionActionsColumn={"last"}
            renderRowActionMenuItems={({ row }) => [
                <ActionMenuItems config={classroomConfig} id={row.original.id}>
                    <ClassroomDelete id={row.original.id} refetch={refetch}/>
                </ActionMenuItems>
            ]}
            muiTableBodyRowProps={({ row }) => ({
                onClick: (event) => {
                    handleRowClick(row.original.name);
                },
            })}
            renderTopToolbarCustomActions={() => (
                <Stack direction={"row"}>
                    <Tooltip arrow title="Actualiser">
                        <IconButton onClick={refetch}>
                            <Refresh/>
                        </IconButton>
                    </Tooltip>
                    <Link href={classroomConfig.path.new}>
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



