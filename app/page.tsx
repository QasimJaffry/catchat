// app/dashboard/page.tsx
import CatCard from "./dashboard/[characterId]/components/CatCard";

export const cats = [
  {
    id: 1,
    name: "Whiskers",
    imageSrc:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Orange tabby cat sitting on a windowsill",
    scenario:
      "Detective Whiskers is on the case, solving the mystery of the missing tuna cans.",
  },
  {
    id: 2,
    name: "Luna",
    imageSrc:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Black cat with striking yellow eyes",
    scenario:
      "Astronaut Luna prepares for her first mission to the catnip planet.",
  },
  {
    id: 3,
    name: "Milo",
    imageSrc:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Ginger cat wearing a bowtie",
    scenario:
      "Chef Milo hosts his first feline cooking show, 'Purr-fect Plates'.",
  },
  {
    id: 4,
    name: "Bella",
    imageSrc:
      "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "White fluffy cat with blue eyes",
    scenario:
      "Fashion model Bella struts down the catwalk in the latest feline couture.",
  },
  {
    id: 5,
    name: "Oliver",
    imageSrc:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Ginger cat with green eyes",
    scenario: "Magician Oliver prepares for his greatest disappearing act yet.",
  },
  {
    id: 6,
    name: "Lucy",
    imageSrc:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Calico cat looking curious",
    scenario:
      "Scientist Lucy discovers a groundbreaking formula for infinite treats.",
  },
  {
    id: 7,
    name: "Max",
    imageSrc:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Tabby cat with a serious expression",
    scenario:
      "Private investigator Max takes on his most challenging case yet.",
  },
  {
    id: 8,
    name: "Nala",
    imageSrc:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Siamese cat with blue eyes",
    scenario: "Yoga instructor Nala leads a purr-fect meditation session.",
  },
  {
    id: 9,
    name: "Charlie",
    imageSrc:
      "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Black and white tuxedo cat",
    scenario:
      "Pianist Charlie composes a symphony inspired by the sound of kibble.",
  },
  {
    id: 10,
    name: "Simba",
    imageSrc:
      "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Maine Coon cat with a majestic mane",
    scenario:
      "King Simba rules over his cardboard box kingdom with wisdom and grace.",
  },
  {
    id: 11,
    name: "Chloe",
    imageSrc:
      "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Tortoiseshell cat with a skeptical look",
    scenario: "Food critic Chloe judges the latest gourmet cat food offerings.",
  },
  {
    id: 12,
    name: "Leo",
    imageSrc:
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Orange tabby cat yawning",
    scenario:
      "Motivational speaker Leo inspires cats to embrace their inner lion.",
  },
  {
    id: 13,
    name: "Zoe",
    imageSrc:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Gray cat with yellow eyes",
    scenario:
      "Tech genius Zoe develops a revolutionary app for instant treat delivery.",
  },
  {
    id: 14,
    name: "Oscar",
    imageSrc:
      "https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Scottish Fold cat with folded ears",
    scenario:
      "Philosopher Oscar contemplates the meaning of life and laser pointers.",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cats.map((cat) => (
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
