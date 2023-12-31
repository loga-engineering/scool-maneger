import Link from 'next/link';
import React, {useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {MaterialReactTable} from "material-react-table";
import {IconButton, MenuItem, Stack, Tooltip} from "@mui/material";

import {useRouter} from "next/navigation";
import {useRecoilState, useRecoilValue} from "recoil";
import {gradeConfig} from "@/features/grades/grade-config";
import {gradeQueryState} from "@/features/grades/grade-services";
import {studentConfig} from "@/features/students/student-config";
import {useSearch} from "@/shared/components/tables/table-hooks";
import {studentQueryState} from "@/features/students/student-services";
import StudentDelete from "@/features/students/components/student-delete";
import {initialPagination} from "../../../shared/components/tables/table-utils";
import {MRT_Localization_FR} from "material-react-table/locales/fr";

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
    const [pagination, setPagination] = useState(initialPagination);

    const studentQuery = useRecoilValue(studentQueryState);
    const [columnFilters, setColumnFilters] = useState([
        {id: 'classroom.name', value: studentQuery.query},{id: 'firstName', value: studentQuery.firstName},
        {id: 'lastName', value: studentQuery.lastName}]);

    const {data: currentPage, isLoading, isError, error, refetch} = useSearch({
        query: globalFilter, page: pagination.pageIndex, size: pagination.pageSize, sort, filter: columnFilters,
        path: studentConfig.path.search
    });

    const router = useRouter();
    const [gradeQuery, setGradeQuery] = useRecoilState(gradeQueryState);
    const handleRowClick = (firstName, lastName) => {
        setGradeQuery((prevState) => ({
            ...prevState,
            firstName: firstName,
            lastName: lastName,
        }));
        router.push(gradeConfig.path.root);
    };

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
                    <Link href={studentConfig.path.details(row.original.id)}>
                        <Tooltip arrow title="Détails">
                            <IconButton><VisibilityIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"edit"}>
                    <Link href={studentConfig.path.edit(row.original.id)}>
                        <Tooltip arrow title="Modifier">
                            <IconButton><EditIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"delete"}>
                    <StudentDelete id={row.original.id} refetch={refetch}/>
                </MenuItem>
            ]}
            muiTableBodyRowProps={({ row }) => ({
                onDoubleClick: (event) => {
                    handleRowClick(row.original.firstName,row.original.lastName);
                },
            })}
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



