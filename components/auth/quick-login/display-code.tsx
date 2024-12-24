import { Button } from "@/components/ui/button";
import Link from "next/link";

type DisplayCodeProps = {
    code: string,
    qrCodeUrl: string | null
}

export function DisplayQuickLoginCode({
    code,
    qrCodeUrl
}: DisplayCodeProps) {
    return <>
        <div className="space-y-4">
            <h2 className="text-xl text-center text-muted-foreground">Option 1</h2>
            <div className="flex justify-center">
                <img
                    src={qrCodeUrl || "/assets/question-mark.png"}
                    alt="QR Code for quick sign in"
                    className="bg-white p-2 rounded-lg w-48 h-48"
                />
            </div>
            <p className="text-center text-muted-foreground">
                Scan this QR code from your logged in device&apos;s camera.
            </p>
            <Link href="https://en.help.roblox.com/hc/en-us/articles/360056582012-Quick-Login" target='_blank'>
                <Button
                    variant="link"
                    className="w-full"
                >
                    Having trouble?
                </Button>
            </Link>
        </div>

        <div className="space-y-4">
            <h2 className="text-xl text-center text-muted-foreground">Option 2</h2>
            <div className="flex justify-center">
                <code className="text-4xl font-mono bg-muted p-4 rounded-lg">
                    {code}
                </code>
            </div>
            <p className="text-center text-muted-foreground text-sm">
                Open your Roblox app and go to:
                <br />
                More Page {'>'} Quick Sign In to enter your code.
            </p>
        </div>
    </>
}