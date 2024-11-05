import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";

export default function ChatPage() {
  return (
    <div className="sm:flex h-[90vh] ">
      <ChatList />

      <ChatScreen />
    </div>
  );
}
