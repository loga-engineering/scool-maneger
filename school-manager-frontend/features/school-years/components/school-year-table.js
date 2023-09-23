import Link from 'next/link';
import {useRouter} from "next/navigation";
import React, {useMemo, useState} from "react";
import {Add, Refresh} from "@mui/icons-material";
import {MaterialReactTable} from "material-react-table";
import {IconButton, MenuItem, Stack, Tooltip} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {useRecoilState} from "recoil";
import {schoolYearConfig} from "../school-year-config";
import {useSearch} from "@/shared/components/tables/table-hooks";
import {classroomConfig} from "@/features/classrooms/classroomConfig";
import {classroomQueryState} from "@/features/classrooms/classroom-services";
import {initialPagination} from "../../../shared/components/tables/table-utils";
import SchoolYearDelete from "@/features/school-years/components/school-year-delete";
import {MRT_Localization_FR} from "material-react-table/locales/fr";


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
    const [sort, setSort] = useState([{id: 'year', desc: true}]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState(initialPagination);

    const {data: currentPage, isLoading, isError, error, refetch} = useSearch({
            query: globalFilter, page: pagination.pageIndex, size: pagination.pageSize, sort, filter: columnFilters,
            path: schoolYearConfig.path.search
    });

    const router = useRouter();
    const [classroomQuery, setClassroomQuery] = useRecoilState(classroomQueryState);
    const handleRowClick = (year) => {
        setClassroomQuery((prevState) => ({
            ...prevState,
            query: year,
        }));
        router.push(classroomConfig.path.root);
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
                    <Link href={schoolYearConfig.path.details(row.original.id)}>
                        <Tooltip arrow title="Détails">
                            <IconButton><VisibilityIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"edit"}>
                    <Link href={schoolYearConfig.path.edit(row.original.id)}>
                        <Tooltip arrow title="Modifier">
                            <IconButton><EditIcon /></IconButton>
                        </Tooltip>
                    </Link>
                </MenuItem>,
                <MenuItem key={row.original.id +"delete"}>
                    <SchoolYearDelete id={row.original.id} refetch={refetch}/>
                </MenuItem>
            ]}
            muiTableBodyRowProps={({ row }) => ({
                onDoubleClick: (event) => {
                    handleRowClick(row.original.year);
                },
            })}
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



