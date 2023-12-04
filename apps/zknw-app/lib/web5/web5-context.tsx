'use client';

import { type Web5 as Web5Ctor } from '@web5/api';

import { useEffect, useState } from 'react';
import { Type } from '@sinclair/typebox';

export async function initializeWeb5() {
  const { Web5 } = (await import('@web5/api/browser')) as {
    Web5: typeof Web5Ctor;
  };
  const { web5, did } = await Web5.connect();

  console.log(
    'schema',
    Type.Object({
      description: Type.String(),
      key: Type.String(),
    })
  );

  const protocolDefintion = {
    protocol: 'https://didcomm.org/zknw',
    published: false,
    types: {
      invite: {
        schema:
          'https://raw.githubusercontent.com/zknw/schemas/main/invite.json',
        dataFormats: ['text/plain'],
      },
      claim: {
        schema:
          'https://raw.githubusercontent.com/zknw/schemas/main/claim.json',
        dataFormats: ['text/plain'],
      },
    },
    structure: {
      invite: {
        $actions: [
          { who: 'anyone', can: 'write' },
          { who: 'anyone', can: 'read' },
        ],
        claim: {
          $actions: [
            { who: 'anyone', can: 'write' },
            { who: 'author', of: 'invite', can: 'read' },
          ],
        },
      },
    },
  };

  const config = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefintion,
    },
  });

  console.log('protocol status', config.status);

//   const { record: inviteRecord, status: createStatus } = await web5.dwn.records.create({
//     data: did,
//     message: {
//       dataFormat: 'text/plain',
//       schema: 'https://raw.githubusercontent.com/zknw/schemas/main/invite.json',
//       protocol: protocolDefintion.protocol,
//       protocolPath: 'invite',
//       published: true,
//     },
//   });

//   console.log({
//     createStatus,
//     id: inviteRecord?.id,
//     context: inviteRecord?.contextId,
//   })


  return {
    web5,
    did,
  };
}

export const Web5Component = () => {
  const [web5, setWeb5] = useState<Web5Ctor | null>(null);
  const [did, setDid] = useState<string | null>(null);

  useEffect(() => {
    initializeWeb5().then(({ web5, did }) => {
      console.log(web5, did);
      setWeb5(web5);
      setDid(did);
    });
  }, []);

  return (
    <div>
      {/* <p>{did}</p> */}
    </div>
  );
};
