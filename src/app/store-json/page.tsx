/*
    * This file contains the StoreJsonPage component.
 */
"use client";

import {useDataContext} from "../context/DataContext";

export default function StoreJsonPage() {
    const {jsonData} = useDataContext();

    // JSON download function
    const handleDownload = () => {
        // Url with the JSON data
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], {type: "application/json"});
        const url = URL.createObjectURL(blob);

        // Anchor element to download the JSON data
        const a = document.createElement("a");
        a.href = url;
        a.download = "alert360_data.json";
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl font-bold mb-6">Stored JSON Data</h1>

            {/* Render the JSON data */}
            <pre
                className="bg-gray-100 p-4 border border-gray-300 rounded-md text-sm text-black mb-6 whitespace-pre-wrap w-full max-w-2xl">
        {JSON.stringify(jsonData, null, 2)}
      </pre>

            {/* Add a download button */}
            <button
                // Call the download function
                onClick={handleDownload}
                className="rounded-full border border-solid border-transparent transition-colors bg-green-500 text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-green-600 mb-4"
            >
                Download JSON
            </button>

            {/* Back button */}
            <button
                onClick={() => history.back()}
                className="rounded-full border border-solid border-transparent transition-colors bg-blue-500 text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-blue-600"
            >
                Back
            </button>
        </div>
    );
}