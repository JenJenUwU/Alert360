/*
    * This file contains the main page component that includes the Logo, Form. Primarily front-end code and styling.
 */
"use client";

import {useState, useEffect} from "react";
import {useDataContext} from "./context/DataContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const {addJsonData} = useDataContext();
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [full_name, setFull_name] = useState("");
    const [requireMedicalHelp, setRequireMedicalHelp] = useState("No");
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [canMove, setCanMove] = useState("Yes");
    const [reason, setReason] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [numOfPeople, setNumOfPeople] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [timestamp, setTimestamp] = useState<string | null>(null);

    {/* List of conditions */
    }
    const conditions = [
        {label: "Bleeding: Head", value: "bleeding_head"},
        {label: "Bleeding: Chest", value: "bleeding_chest"},
        {label: "Bleeding: Abdomen", value: "bleeding_abdomen"},
        {label: "Bleeding: Arms", value: "bleeding_arms"},
        {label: "Bleeding: Legs", value: "bleeding_legs"},
        {label: "Burns: Head", value: "burns_head"},
        {label: "Burns: Chest", value: "burns_chest"},
        {label: "Burns: Abdomen", value: "burns_abdomen"},
        {label: "Burns: Arms", value: "burns_arms"},
        {label: "Burns: Legs", value: "burns_legs"},
        {label: "Chest pain", value: "chest_pain"},
        {label: "Coughing/vomiting up blood", value: "coughing_blood"},
        {label: "Fainting / Loss of consciousness", value: "fainting"},
        {label: "Head or spine injury", value: "head_spine_injury"},
        {label: "Dizziness, weakness, change in vision", value: "dizziness"},
        {label: "Abdominal pain or pressure", value: "abdominal_pain"},
        {label: "Swelling of face, eyes, or tongue", value: "swelling_face"},
        {label: "Bluish skin color", value: "bluish_skin"},
    ];

    useEffect(() => {
        setTimestamp(new Date().toISOString()); // Obtain timestamp
    }, []);

    const handleCheckboxChange = (value: string) => {
        setSelectedConditions((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newEntry = {
            full_name,
            latitude,
            longitude,
            requireMedicalHelp,
            selectedConditions,
            canMove,
            reason: canMove === "No" ? reason : null,
            age: age ? Number(age) : null, // Parse age to a number or keep as null if empty
            sex: sex || null, // Keep as null if not set
            numOfPeople: numOfPeople || null, // Keep as null if not set
            additionalInfo: additionalInfo || null, // Keep as null if not set
            timestamp: timestamp || new Date().toISOString(),
        };

        // On button click, add the updated entry to the JSON data
        addJsonData(newEntry);

        // Clear form
        setFull_name("");
        setLatitude("");
        setLongitude("");
        setRequireMedicalHelp("No");
        setSelectedConditions([]);
        setCanMove("Yes");
        setReason("");
        setAge("");
        setSex("");
        setAdditionalInfo("");
        setNumOfPeople("");
        setTimestamp(null);
    };

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-stretch min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center">
                {/* Logo Component*/}
                <div>
                    <Image
                        src="/Alert360.png"
                        alt="Alert360 Logo"
                        width={200}
                        height={200}

                    />
                </div>
                {/* Form Component */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full"
                >
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="user_name" className="text-sm font-medium">
                            Full name:
                        </label>
                        <input
                            type="string"
                            id="user_name"
                            value={full_name}
                            onChange={(e) => setFull_name(e.target.value)}
                            className="text-black border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-sm w-full "
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    {/* Latitude */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="latitude" className="text-sm font-medium">
                            Latitude:
                        </label>
                        <input
                            type="number"
                            id="latitude"
                            value={latitude}
                            min={-90}
                            max={90}
                            step="any"
                            onChange={(e) => setLatitude(e.target.value)}
                            className="text-black border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-sm w-full"
                            placeholder="Enter latitude"
                            required
                        />
                    </div>
                    {/* Longitude */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="longitude" className="text-sm font-medium">
                            Longitude:
                        </label>
                        <input
                            type="number"
                            id="longitude"
                            value={longitude}
                            min={-180}
                            max={180}
                            step="any"
                            onChange={(e) => setLongitude(e.target.value)}
                            className="text-black border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-sm w-full"
                            placeholder="Enter longitude"
                            required
                        />
                    </div>
                    {/* Require Medical Help */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                            Require medical help?
                        </label>
                        <div className="flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    value="No"
                                    checked={requireMedicalHelp === "No"}
                                    onChange={(e) => setRequireMedicalHelp(e.target.value)}
                                />{" "}
                                No
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Yes"
                                    checked={requireMedicalHelp === "Yes"}
                                    onChange={(e) => setRequireMedicalHelp(e.target.value)}
                                />{" "}
                                Yes
                            </label>
                        </div>
                    </div>
                    {requireMedicalHelp === "Yes" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">
                                Select applicable conditions:
                            </label>
                            <div className="flex flex-col gap-2">
                                {conditions.map((condition) => (
                                    <label key={condition.value}>
                                        <input
                                            type="checkbox"
                                            value={condition.value}
                                            checked={selectedConditions.includes(condition.value)}
                                            onChange={() => handleCheckboxChange(condition.value)}
                                        />{" "}
                                        {condition.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Can You Move */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Can you move?</label>
                        <div className="flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    value="Yes"
                                    checked={canMove === "Yes"}
                                    onChange={(e) => setCanMove(e.target.value)}
                                />{" "}
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="No"
                                    checked={canMove === "No"}
                                    onChange={(e) => setCanMove(e.target.value)}
                                />{" "}
                                No
                            </label>
                        </div>
                    </div>
                    {canMove === "No" && (
                        <div className="flex flex-col gap-2">
                            <label htmlFor="reason" className="text-sm font-medium">
                                If no, please provide a reason:
                            </label>
                            <input
                                type="text"
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="text-black border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-sm w-full"
                                placeholder="Enter reason"
                                required
                            />
                        </div>
                    )}
                    {/* Age */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="age" className="text-sm font-medium">
                            Age: (optional)
                        </label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            min={0}
                            onChange={(e) => setAge(e.target.value)}
                            className="text-black border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-sm w-full"
                            placeholder="Enter age"
                        />
                    </div>
                    {/* Sex */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Sex: (optional)</label>
                        <div className="flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    value="Male"
                                    checked={sex === "Male"}
                                    onChange={(e) => setSex(e.target.value)}
                                />{" "}
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Female"
                                    checked={sex === "Female"}
                                    onChange={(e) => setSex(e.target.value)}
                                />{" "}
                                Female
                            </label>
                        </div>
                    </div>
                    {/* Number of People */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="num_of_people" className="text-sm font-medium">
                            Additional people with you: (optional)
                        </label>
                        <input
                            type="number"
                            id="num_of_people"
                            value={numOfPeople}
                            min={"0"}
                            onChange={(e) => setNumOfPeople(e.target.value)}
                            className="text-black border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-sm w-full"
                            placeholder="Enter number of people with you"
                        />
                    </div>
                    {/* Additional Info */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="additional_info" className="text-sm font-medium">
                            Additional info: (optional)
                        </label>
                        <textarea
                            id="additional_info"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className="text-black border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-sm w-full"
                            placeholder="Enter additional information"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-6 rounded-full border border-solid border-transparent transition-colors bg-blue-500 text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-blue-600"
                    >
                        Add to JSON
                    </button>
                </form>
                {/* View Stored JSON */}
                <Link legacyBehavior href="/store-json">
                    <a className="text-blue-500 underline">View Stored JSON</a>
                </Link>
            </main>
        </div>
    );
}