// app/dashboard/page.tsx
"use client";
import Loader from "@/components/Loader";
import CatCard from "./chat/[characterId]/components/CatCard";
import { db } from "@/lib/firebase"; // Import your Firebase configuration
import { useEffect, useState } from "react"; // Import React hooks
import { collection, query, onSnapshot } from "firebase/firestore"; // Import Firestore functions

async function fetchCats() {
  try {
    const res = await fetch("http://localhost:3000/api/initializeCats", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch cats");
    }

    const data = await res.json();

    console.log(data, "RESPO");
    return data;
  } catch (error) {
    console.error("Error fetching cats:", error);
    return [];
  }
}

export default async function Dashboard() {
  // await fetchCats();
  const [catsData, setCatsData] = useState([]); // State to hold cat data

  // if (!catsData) {
  //   return <Loader />;
  // }

  useEffect(() => {
    const q = query(collection(db, "cats")); // Adjust the collection name as needed
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedCats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCatsData(fetchedCats); // Update state with fetched data
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (!catsData || catsData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {catsData &&
            catsData.length > 0 &&
            catsData.map((cat) => (
              <div key={cat.id} className="h-[350px] sm:h-[400px] md:h-[450px]">
                <CatCard
                  id={cat.id}
                  name={cat.name}
                  imageSrc={cat.imageSrc}
                  imageAlt={cat.imageAlt}
                  scenario={cat.scenario}
                />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
