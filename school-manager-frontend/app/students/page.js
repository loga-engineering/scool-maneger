import StudentListView from "@/features/students/view/student-list-view";
import {ModuleProvider} from "../../shared/context/module-context";

export const metadata = {
    title: "Gestion des élèves",
}

export default function StudentPage() {
    return (
        <ModuleProvider name={"students"} urlBase={"/students"}>
            <StudentListView/>
        </ModuleProvider>
    );
}