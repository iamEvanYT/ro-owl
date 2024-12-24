import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import Image from "next/image";

export function HomeFriendsSection() {
    const numberOfFriends = 20;

    return <div className="space-y-4">
        <div className="flex justify-between items-center text-black dark:text-white">
            <h2 className="text-xl font-semibold">Friends ({numberOfFriends})</h2>
            <Button variant="link">
                See All →
            </Button>
        </div>
        <div className="flex gap-4 overflow-x-hidden pb-4">
            {Array.from({ length: numberOfFriends }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 min-w-[100px] hover:underline underline-offset-1 decoration-black dark:decoration-white">
                    <div className="relative">
                        <Image
                            src="/api/roblox/image-assets/user/headshot/1"
                            alt="Friend avatar"
                            width={100}
                            height={100}
                            className="rounded-full bg-slate-200 dark:bg-muted"
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-zinc-900 flex align-middle justify-center items-center" />
                    </div>
                    <div className="user-info text-center">
                        <p className="font-medium text-sm text-black dark:text-white">Username</p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Blox Fruits</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
}