'use client';

import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { Type } from '@sinclair/typebox';
import { type Web5 } from '@web5/api';
import {
  FullscreenLoader,
} from 'apps/zknw-app/components/fullscreen-loader';
import { AnimatePresence } from 'framer-motion';

export async function initializeWeb5() {
  // @ts-ignore
  const { Web5: Web5Factory } = (await import('@web5/api/browser')) as {
    Web5: typeof Web5;
  };
  const { web5, did } = await Web5Factory.connect();

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

export const Web5Context = createContext<{ web5?: Web5; did?: string }>({});

export const Web5Component = ({ children }: PropsWithChildren) => {
  const [web5, setWeb5] = useState<Web5 | undefined>(undefined);
  const [did, setDid] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log('initializing web5');
    initializeWeb5().then(({ web5, did }) => {
      console.log('initilized', web5, did);
      setWeb5(web5);
      setDid(did);
    });
  }, []);

  return (
    <Web5Context.Provider value={{ web5, did }}>
      {children}
      <AnimatePresence initial={false}>
        {!web5 && (
          <FullscreenLoader>
            loading web5
          </FullscreenLoader>
        )}
      </AnimatePresence>
    </Web5Context.Provider>
  );
};
