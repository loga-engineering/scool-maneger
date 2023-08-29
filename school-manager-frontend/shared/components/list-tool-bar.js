import {Card, CardHeader, IconButton, Stack} from "@mui/material";
import SearchField from "@/shared/components/search-field";
import {Add, Refresh} from "@mui/icons-material";
import Link from "next/link";


export default function ListToolBar({children, label, length, refetch, query, setQuery,config}) {

    return (
        <Card>

            <CardHeader
                title={<SearchField query={query} setQuery={setQuery} label={label} length={length} />}
                action={(
                    <Stack direction={"row"}>
                        <Link href={config.path.new}>
                            <IconButton>
                                <Add/>
                            </IconButton>
                        </Link>

                        <IconButton onClick={refetch}>
                            <Refresh/>
                        </IconButton>
                    </Stack>
                )}
            />

            {children}

        </Card>

    );

}