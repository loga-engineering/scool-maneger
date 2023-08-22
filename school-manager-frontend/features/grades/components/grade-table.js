"use client";

import React, {useEffect, useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import {MaterialReactTable} from "material-react-table";
import {IconButton, Link, Stack, Tooltip} from "@mui/material";

import {useRecoilValue} from "recoil";
import {gradeConfig} from "@/features/grades/grade-config";
import {useSearch} from "@/shared/components/tables/table-hooks";
import {gradeQueryState} from "@/features/grades/grade-services";
import GradeDelete from "@/features/grades/components/grade-delete";
import ActionMenuItems, {initialPagination} from "../../../shared/components/tables/table-utils";

const useColumns = () => useMemo(() => [
    {
        accessorKey: 'exam.examDate',
        header: "Date d'examen",
    },
    {
        accessorKey: 'exam.subject',
        header: 'Matière',
    },
    {
        accessorKey: 'value',
        header: 'Note',
    },
    {
        accessorKey: 'student.firstName',
        header: 'Prénom',
    },
    {
        accessorKey: 'student.lastName',
        header: 'Nom',
    },
    {
        accessorKey: 'student.classroom.name',
        header: 'Classe',
    },
], []);


export default function GradeTable() {
    const [sort, setSort] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState(initialPagination);

    const gradeQuery = useRecoilValue(gradeQueryState);
    const [columnFilters, setColumnFilters] = useState([
        {id: 'student.lastName', value: gradeQuery.lastName}, {id: 'student.firstName', value: gradeQuery.firstName},
        {id: 'exam.examDate', value: gradeQuery.examDate}, {id: 'exam.subject', value: gradeQuery.subject}
    ]);


    const {data: currentPage, isLoading, isError, error, refetch} = useSearch({
            query: globalFilter, page: pagination.pageIndex, size: pagination.pageSize, sort, filter: columnFilters,
            path: gradeConfig.path.search
    });


    // useEffect(() => {
    //     if(!isLoading){
    //         setColumnFilters([
    //             {id: 'student.firstName', value: gradeQuery.firstName},{id: 'student.lastName', value: gradeQuery.lastName},
    //             {id: 'exam.examDate', value: gradeQuery.examDate},{id: 'exam.subject', value: gradeQuery.subject}])
    //     }
    // }, [isLoading]);

    console.log("data ===> ", currentPage);

    const columns = useColumns();

    return (
        <MaterialReactTable
            columns={columns}
            data={currentPage?.content ?? []}
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
                <ActionMenuItems config={gradeConfig} id={row.original.id}>
                    <GradeDelete id={row.original.id} refetch={refetch}/>
                </ActionMenuItems>
            ]}
            renderTopToolbarCustomActions={() => (
                <Stack direction={"row"}>
                    <Tooltip arrow title="Actualiser">
                        <IconButton onClick={refetch}>
                            <Refresh/>
                        </IconButton>
                    </Tooltip>
                    <Link href={gradeConfig.path.new}>
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



