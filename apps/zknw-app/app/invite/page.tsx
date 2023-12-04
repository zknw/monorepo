import ConnectButton from 'apps/zknw-app/components/connect-button';
import { UserAvatar } from 'apps/zknw-app/components/user-avatar';

export default function InvitePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <UserAvatar />
        <h2 className="text-3xl mb-10">
          <span>
            <span className="text-slate-500 font-light">@</span>
            <span className="text-slate-50 font-semibold">aler</span>
          </span>{' '}
          invited you!
        </h2>

        <div className="flex flex-col gap-8">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
