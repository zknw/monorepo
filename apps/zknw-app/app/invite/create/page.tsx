import { InviteCreationForm } from './InviteCreationForm';

export default function InviteCreatePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">What you know about mate?</h1>
        <InviteCreationForm />

        {/* <UserAvatar /> */}
        {/* <div className="flex flex-col gap-8"> */}
        {/* <ConnectButton /> */}
        {/* </div> */}
        {/* <Web5Component /> */}
      </div>
    </div>
  );
}
