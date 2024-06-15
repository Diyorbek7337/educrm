import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { AddDataLidProvider } from "./AddDataLidsFromModal";
import { SearchProvider } from "./SearchContext";
import { SearchPupilProvider } from "./SearchStudentContext";
import { ScheduleProvider } from "./addSchedule";
import { ModalProvider } from "./Addmodal";
import { StudentProvider } from "./StudentContext";



export const CombinedProviders = ({ children }) => {
    return (
      <ThemeProvider>
        <ModalProvider>
          <AddDataLidProvider>
            <SearchProvider>
              <SearchPupilProvider>
                <ScheduleProvider>
                  <StudentProvider>
                    {children}
                  </StudentProvider>
                </ScheduleProvider>
              </SearchPupilProvider>
            </SearchProvider>
          </AddDataLidProvider>
        </ModalProvider>
      </ThemeProvider>
    );
  };