// app/dashboard/page.tsx
"use client";
import Loader from "@/components/Loader";
import CatCard from "./chat/[characterId]/components/CatCard";
import { db } from "@/lib/firebase"; // Import your Firebase configuration
import { useEffect, useState } from "react"; // Import React hooks
import { collection, query, onSnapshot } from "firebase/firestore"; // Import Firestore functions
import { useCat } from "@/context/CatContext";
import CatModal from "@/components/CatModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Define Cat type
interface Cat {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  scenario: string;
  personality: string;
}

async function fetchCats(): Promise<Cat[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/initializeCats`,
      {}
    );
    if (!res.ok) {
      throw new Error("Failed to fetch cats");
    }

    const data: Cat[] = await res.json();
    console.log(data, "RESPO");
    return data;
  } catch (error) {
    console.error("Error fetching cats:", error);
    return [];
  }
}

export default function Dashboard() {
  const [catsData, setCatsData] = useState<Cat[]>([]); // State to hold cat data
  const { selectedCat, setSelectedCat } = useCat();
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "cats")); // Adjust the collection name as needed
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedCats: Cat[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Cat[];
      setCatsData(fetchedCats); // Update state with fetched data
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (!catsData || catsData.length === 0) {
    return <Loader />;
  }

  const handleOpenModal = (item: Cat) => {
    setSelectedCat(item);
    setModalOpen(true);
  };

  return (
    <div className="flex justify-center ">
      <div className="mt-5 mx-auto grid gap-x-5 gap-y-5 sm:gap-y-15 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {catsData.map((cat) => (
          <CatCard
            item={cat}
            name={cat.name}
            imageSrc={cat.imageSrc}
            imageAlt={cat.imageAlt}
            scenario={cat.scenario}
            personality={cat.personality}
            setSelectedCat={handleOpenModal}
          />
        ))}
      </div>

      <CatModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        cat={selectedCat}
        onPressChat={() => {
          if (user && selectedCat) {
            router.push(`/chat/${user.uid}${selectedCat.id}`);
          }
          setModalOpen(false);
        }}
        isLoggedIn={!!user}
      />
    </div>
  );
}
