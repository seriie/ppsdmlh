'use client';

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [sessions, setSessions] = useState(); 
    const { data: session } = useSession();

    useEffect(() => {
        setSessions(session?.user && (session.user as any).token);
    }, []);

    return (
        <>
            sessions: {sessions}
        </>
    )
}