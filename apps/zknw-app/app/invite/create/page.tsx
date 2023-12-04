import ConnectButton from "apps/zknw-app/components/connect-button";
import { UserAvatar } from "apps/zknw-app/components/user-avatar";
import { Web5Component } from "apps/zknw-app/lib/web5/web5-context";

export default function InviteCreatePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <UserAvatar />
        <div className="flex flex-col gap-8">
          <ConnectButton />
        </div>
        <Web5Component />
      </div>
    </div>
  );
}
