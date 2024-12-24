import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";

export function HomeTodaysPicks() {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold">Today's Picks</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">A curated selection of daily highlights</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        title: "Regretevator [ ELEVATOR SIMULATOR ]",
                        status: "Update",
                        description: "New Fall update",
                        image: "/api/roblox/image-assets/game/main-thumbnail/1709917610"
                    },
                    {
                        title: "Doodle World [ 🎃 HALLOWEEN ❌]",
                        status: "Update",
                        description: "New Fantasy battlepass",
                        image: "/api/roblox/image-assets/game/main-thumbnail/1775919872"
                    },
                    {
                        title: "Golf Frenzy!",
                        description: "Play the Halloween update",
                        image: "/api/roblox/image-assets/game/main-thumbnail/3322582746"
                    },
                    {
                        title: "Arm Wrestle Simulator",
                        status: "New level",
                        description: "Storm the Horseman's tower",
                        image: "/api/roblox/image-assets/game/main-thumbnail/4582358979"
                    }
                ].map((game, i) => (
                    <Card key={i} className="border-2 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
                        <Image
                            src={game.image}
                            alt={game.title}
                            width={350}
                            height={200}
                            className="w-full aspect-video object-cover bg-gray-100 dark:bg-black"
                        />
                        <div className="p-4 pt-3 space-y-1 text-black dark:text-white">
                            <Badge variant="secondary" className={`bg-gray-200 dark:bg-zinc-700 ${!game.status && "opacity-0"}`}>
                                {game.status}
                            </Badge>
                            <h3 className="font-semibold line-clamp-1">{game.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">{game.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}