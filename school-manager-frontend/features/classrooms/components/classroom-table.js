
import Link from 'next/link';
import {useRouter} from "next/navigation";
import React, {useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import {useRecoilState, useRecoilValue} from "recoil";
import {MaterialReactTable} from "material-react-table";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {IconButton, MenuItem, Stack, Tooltip} from "@mui/material";

import {useSearch} from "@/shared/components/tables/table-hooks";
import {studentConfig} from "@/features/students/student-config";
import {classroomConfig} from "@/features/classrooms/classroomConfig";
import {studentQueryState} from "@/features/students/student-services";
import {classroomQueryState} from "@/features/classrooms/classroom-services";
import ClassroomDelete from "@/features/classrooms/components/classroom-delete";
import {initialPagination} from "../../../shared/components/tables/table-utils";

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

    const [sort, setSort] = useState([{id: 'name', desc: false}]);
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
                <MenuItem key={row.original.id + "details"}>
                    <Link href={classroomConfig.path.details(row.original.id)}>
                        <Tooltip arrow title="Détails">
                            <IconButton><VisibilityIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"edit"}>
                    <Link href={classroomConfig.path.edit(row.original.id)}>
                        <Tooltip arrow title="Modifier">
                            <IconButton><EditIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"delete"}>
                    <ClassroomDelete id={row.original.id} refetch={refetch}/>
                </MenuItem>
            ]}
            muiTableBodyRowProps={({ row }) => ({
                onDoubleClick: (event) => {
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



