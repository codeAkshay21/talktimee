'use server';

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if(!user) throw new Error ('User is not logged in');
    if(!STREAM_API_KEY) throw new Error('Stream API key secret is missing');
    if(!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

    const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
const issued = Math.floor(Date.now()/1000) -60;

const token = streamClient.createToken(user.id, exp, issued);
return token;
}