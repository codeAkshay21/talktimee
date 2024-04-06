"use client";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import Loader from "@/components/ui/Loader";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params :{id}}: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComlete, setisSetupComlete] = useState(false);
const {call, isCallLoading} = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComlete ? <MeetingSetup setisSetupComlete = {setisSetupComlete}/>
           : 
           <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
 