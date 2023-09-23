import Link from 'next/link';
import React, {useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import {MaterialReactTable} from "material-react-table";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {IconButton,MenuItem, Stack, Tooltip} from "@mui/material";

import {useRecoilState} from "recoil";
import {useRouter} from "next/navigation";
import {examConfig} from "../exam-config";
import {gradeConfig} from "@/features/grades/grade-config";
import {useSearch} from "@/shared/components/tables/table-hooks";
import ExamDelete from "@/features/exams/components/exam-delete";
import {gradeQueryState} from "@/features/grades/grade-services";
import {initialPagination} from "../../../shared/components/tables/table-utils";
import {MRT_Localization_FR} from "material-react-table/locales/fr";

const useColumns = () => useMemo(() => [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'subject',
        header: 'Matière',
    },
    {
        accessorKey: 'teacherName',
        header: 'Nom prof.',
    },
    {
        accessorKey: 'examDate',
        header: "Date d'examen",
    },
], []);


export default function ExamTable() {
    const [sort, setSort] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState(initialPagination);

    const [columnFilters, setColumnFilters] = useState([]);

    const {data: currentPage, isLoading, isError, error, refetch} = useSearch({
            query: globalFilter, page: pagination.pageIndex, size: pagination.pageSize, sort, filter: columnFilters,
            path: examConfig.path.search
    });

    const router = useRouter();
    const [gradeQuery, setGradeQuery] = useRecoilState(gradeQueryState);
    const handleRowClick = (examDate,subject) => {
        setGradeQuery((prevState) => ({
            ...prevState,
            examDate: examDate,
            subject: subject,
        }));
        router.push(gradeConfig.path.root);
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
            localization={MRT_Localization_FR}
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
                <MenuItem key={row.original.id + "details"}>
                    <Link href={examConfig.path.details(row.original.id)}>
                        <Tooltip arrow title="Détails">
                            <IconButton><VisibilityIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"edit"}>
                    <Link href={examConfig.path.edit(row.original.id)}>
                        <Tooltip arrow title="Modifier">
                            <IconButton><EditIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"delete"}>
                    <ExamDelete id={row.original.id} refetch={refetch}/>
                </MenuItem>
            ]}
            muiTableBodyRowProps={({ row }) => ({
                onDoubleClick: (event) => {
                    handleRowClick(row.original.examDate,row.original.subject);
                },
            })}
            renderTopToolbarCustomActions={() => (
                <Stack direction={"row"}>
                    <Tooltip arrow title="Actualiser">
                        <IconButton onClick={refetch}>
                            <Refresh/>
                        </IconButton>
                    </Tooltip>
                    <Link href={examConfig.path.new}>
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



