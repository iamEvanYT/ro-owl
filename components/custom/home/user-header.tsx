import { RobloxVerifiedBadge, RoOwlVerifiedBadge } from "@/components/icons/verified-badges";
import Image from "next/image";

export function HomeUserHeader() {
    return (
        <div className="flex items-center gap-4">
            <Image
                src="/api/roblox/image-assets/user/headshot/1391475335"
                alt="Profile"
                width={92}
                height={92}
                className="rounded-full border-2 border-muted-foreground bg-muted"
            />
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-black dark:text-white">Hello, iamEvan</h1>
                    <RobloxVerifiedBadge className="w-7 h-7" />
                    <RoOwlVerifiedBadge className="w-7 h-7" />
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">@iamEvanRBLX</p>
            </div>
        </div>
    )
}