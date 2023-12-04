"use client";

import { type Web5 as Web5Ctor } from '@web5/api';

import { useEffect, useState } from 'react';
import { Type } from '@sinclair/typebox';
    
export async function initializeWeb5() {
    const { Web5 } = await import('@web5/api/browser') as { Web5: typeof Web5Ctor };
    const { web5, did } = await Web5.connect()

    
    console.log('schema', Type.Object({
        description: Type.String(),
        key: Type.String(),
    }).$schema)

    web5.dwn.protocols.configure({
        message: {
            definition: {
                protocol: 'https://didcomm.org/zknw',
                published: false,
                types: {
                    invite: {
                        schema: 'https://ipfs.io/ipfs/'
                    }
                },
                structure: {}
            }
        }
    })

    const { record } = await web5.dwn.records.create({
        data: {
            content: "Hello Web5",
            description: "Keep Building!"
        },
        message: {
            dataFormat: 'application/json',
            published: true
        },
    });

    record?.send("did:ion:EiBp1GeUKbBMnsJvUxYiEyvZKyUHKcMVWfdzpcAvchaa6w:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiSTdsS0hNaFlZQU0tRS10VUs4R0k2T2xtMFFsQVlQLUQ1VUlYTU0ycExoTSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJjeGhMek9paTkxc3N5TFk4NmszVEdZMzU4S25aS3AyYnQzTkhoeEhnQ244IiwieSI6IlU4TG5tTlZOQXRDQmNncUMwN1NJRElaWXFiV19KYjFJSFRkNHR6b0VCSU0ifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDcV9ILXdGblNRMVMzZEI1VUdJMWxCVnZ6cVVJTXBvUURpLVhTcXBxRjFLZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQnBTcXNVSl9BRDNtYlJtZkI3TkcxdTQ0RnJSOUhKVy1EcFJUQjFORTgtWVEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJ6VlB3TmowUVR3T2VzTGx1TzE5VGNPUVN0THNUMVFYVDN2YldIb2FsY0NnIn19")

    console.log(web5, did, record);

    return {
        web5,
        record,
        did
    }
}

export const Web5Component = () => {
    const [web5, setWeb5] = useState<Web5Ctor | null>(null);
    const [did, setDid] = useState<string | null>(null);

    useEffect(() => {
        initializeWeb5().then(({ web5, did }) => {
            console.log(web5, did)
            setWeb5(web5);
            setDid(did);
        })
    }, [])

    return (
        <div>
            <h1>Web5</h1>
            <p>{did}</p>
        </div>
    )
}