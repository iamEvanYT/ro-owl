"use client"

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RedirectWithSession({ location }: { location?: string }) {
    const {
        data,
        isPending,
        error
    } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (!isPending && !error && data) {
            router.push(location || "/");
        }
    }, [data, isPending, error])
    
    return <></>
}