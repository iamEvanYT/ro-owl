"use client"

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RedirectWithoutSession({ location }: { location?: string }) {
    const {
        data,
        isPending,
        error
    } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (!isPending && !error && !data) {
            router.push(location || "/login");
        }
    }, [data, isPending, error])

    return <></>
}