import { CreateNewInvitePage } from './page-content';

export async function generateMetadata() {
  return {
    title: 'ZKNW - Create an invite',
  }
}

export default () => <CreateNewInvitePage />;