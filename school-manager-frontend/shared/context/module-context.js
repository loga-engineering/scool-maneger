
import {CssBaseline} from "@mui/material";
import RecoilProvider from "@/shared/context/recoil-provider";
import ReactQueryProvider from "@/shared/context/react-query-context";
import {DatePickerProvider} from "@/shared/forms/formik-date-picker";
import ThemeProvider from "@/shared/context/theme-provider";



// export const ModuleContext = createContext();
//
//
// export const useModule = () => {
//   return useContext(ModuleContext);
// }



export default function ModuleProvider({ children }) {

    return (
            <ThemeProvider>
                <CssBaseline />
                <RecoilProvider>
                    <ReactQueryProvider>
                        <DatePickerProvider>
                            {children}
                        </DatePickerProvider>
                    </ReactQueryProvider>
                </RecoilProvider>
            </ThemeProvider>
    );
}

