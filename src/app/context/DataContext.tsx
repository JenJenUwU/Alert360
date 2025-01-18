/*
    * Defines the context and enables the manipulation of the data.
 */
"use client";
import React, {createContext, ReactNode, useContext, useState} from "react";

// Type definition from form data
type SubmissionData = {
    full_name: string;
    latitude: string;
    longitude: string;
    requireMedicalHelp: string;
    selectedConditions: string[];
    canMove: string;
    reason: string | null;
    age: number | null;
    sex: string | null;
    numOfPeople: string | null;
    additionalInfo: string | null;
    timestamp: string;
};

// Define the context structure
type DataContextType = {
    jsonData: SubmissionData[]; // Unify data into a JSON array
    addJsonData: (entry: SubmissionData) => void; // Add a new entry to the JSON array
};

// Enable access to the context data globally
const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({children}: { children: ReactNode }) {
    const [jsonData, setJsonData] = useState<SubmissionData[]>([]); // Initialize the data array

    // Add new entry to JSON array
    const addJsonData = (entry: SubmissionData) => {
        setJsonData((data) => [...data, entry]); // Append the new entry to the array
    };

    return (
        <DataContext.Provider value={{jsonData, addJsonData}}>
            {children}
        </DataContext.Provider>
    );
}

// Hook to access the context data
export function useDataContext() {
    const context = useContext(DataContext);
    // Ensure that the hook is used within the provider
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
}