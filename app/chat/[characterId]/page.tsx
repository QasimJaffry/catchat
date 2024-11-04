import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";

interface ChatPageProps {
  params: { characterId: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    <div className="flex h-screen overflow-hidden ">
      <ChatList />

      <ChatScreen selectedCatId={params.characterId} />
    </div>
  );
}
