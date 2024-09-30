import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";

interface ChatPageProps {
  params: { characterId: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="md:block">
        <ChatList />
      </div>
      <ChatScreen selectedCatId={params.characterId} />
    </div>
  );
}
