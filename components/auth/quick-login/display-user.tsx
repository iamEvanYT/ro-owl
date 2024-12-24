import { User } from "lucide-react";

type DisplayUserProps = {
    accountName: string
}

export function DisplayQuickLoginUser({
    accountName
}: DisplayUserProps) {
    return <>
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <User className="h-24 w-24 text-muted-foreground" strokeWidth={1} />
            <h2 className="text-xl text-center text-muted-foreground tracking-wide">
                CONFIRM LOGIN ON YOUR OTHER DEVICE
            </h2>
            <p className="text-sm text-muted-foreground">
                Logging in as {accountName}
            </p>
        </div>
    </>
}