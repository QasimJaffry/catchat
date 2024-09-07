import { useRouter } from "next/navigation";
import Image from "next/image";

const UserComponent = (user: any) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-row space-x-4 items-center"
      onClick={() => router.push(`/chat/${user.uid}`)}
    >
      {/* <Image
        src={
          user?.photoURL ||
          "https://static.vecteezy.com/system/resources/previews/010/871/103/original/3d-avatar-dj-png.png"
        }
        width={40}
        height={40}
        alt={user?.name}
        className="rounded-full"
      /> */}
      <div className="flex flex-col items-center ">
        <h1 className="text-md font-medium">{user?.name}</h1>
        <p className="text-xs text-gray-500"></p>
      </div>
    </div>
  );
};

export default UserComponent;
