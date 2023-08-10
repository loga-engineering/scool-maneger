import SchoolYearListView from "@/features/school-years/view/school-year-list-view";
import StudentListView from "@/features/students/view/student-list-view";

export const metadata = {
    title: "Gestion des élèves",
}

export default function StudentPage() {
    return (
        <StudentListView />
    );
}