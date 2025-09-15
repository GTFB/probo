import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/probo.png" alt="@probo" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  );
}
