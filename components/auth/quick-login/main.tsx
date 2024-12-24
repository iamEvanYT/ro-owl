'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DisplayQuickLoginCode } from './display-code'
import { DisplayQuickLoginUser } from './display-user'
import { requestWithProxy } from '@/lib/proxy/request'

const UPDATE_INTERVAL = (5 * 1000)

export function QuickLoginCard() {
    const [code, setCode] = useState<string | null>(null);
    const [privateKey, setPrivateKey] = useState<string | null>(null);
    const [qrCodeUrl, setQRCodeUrl] = useState<string | null>(null);
    const [accountName, setAccountName] = useState<string | null>(null);
    const csrfToken = useRef<string | null>(null);

    const [shouldRenewCode, setShouldRenewCode] = useState(true);

    useEffect(() => {
        let renewingCode = false;

        async function checkQuickSignin() {
            if (shouldRenewCode) {
                if (renewingCode) return;
                renewingCode = true;
                setShouldRenewCode(false);

                const data = await requestWithProxy('https://apis.roblox.com/auth-token-service/v1/login/create', {
                    method: "POST",
                    cache: "no-cache"
                }).then(response => {
                    return response.json();
                });

                setQRCodeUrl("https://apis.roblox.com/auth-token-service" + (data.imagePath || ""));
                setCode(data.code);
                setPrivateKey(data.privateKey);
                setAccountName(null);

                renewingCode = false;
            } else {
                const body = {
                    code,
                    privateKey
                }

                const response = await requestWithProxy('https://apis.roblox.com/auth-token-service/v1/login/status', {
                    method: "POST",

                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-csrf-token': csrfToken.current || ''
                    }
                });

                const data = await response.text().then((data) => {
                    try {
                        const json = JSON.parse(data);
                        return json
                    } catch {
                        return data
                    }
                })

                if (data == "CodeInvalid") {
                    setShouldRenewCode(true);
                    return
                }

                const newCSRFToken = response.headers.get("x-csrf-token")
                if (newCSRFToken) {
                    csrfToken.current = newCSRFToken;
                    checkQuickSignin();
                }

                if (data.status == "UserLinked") {
                    setAccountName(data.accountName);
                }
            }
        }

        if (shouldRenewCode) {
            checkQuickSignin();
        }
        const intervalId = setInterval(checkQuickSignin, UPDATE_INTERVAL);

        return () => clearInterval(intervalId);
    }, [code, privateKey, shouldRenewCode])

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">Quick Sign In Code</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {code && !accountName && <DisplayQuickLoginCode code={code} qrCodeUrl={qrCodeUrl} />}
                {accountName && <DisplayQuickLoginUser accountName={accountName} />}

                <Alert variant="destructive" className="dardk:bg-gray-300">
                    <AlertDescription className='text-center'>
                        This is not an official Roblox service. <br />
                        Your account credentials will only be used for the intended purpose.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
}