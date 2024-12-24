import * as React from "react";

export const IconMdiOwl = ({
    height = "1em",
    fill = "#4A5568",
    focusable = "false",
    ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
    <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 -2 28 28"
        height={height}
        transform="rotate(20, 0, 0)"
        focusable={focusable}
        {...props}
    >
        <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" />
                <feOffset dx="0.5" dy="0.5" />
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        <rect
            x="-1"
            y="-1"
            width="26"
            height="26"
            rx="4"
            ry="4"
            fill="white"
            filter="url(#shadow)"
        />

        <path
            transform="scale(0.9) translate(1.2,1.2)"
            fill={fill}
            d="M12 16c.56.84 1.31 1.53 2.2 2L12 20.2L9.8 18c.89-.47 1.65-1.16 2.2-2m5-4.8a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m-10 0a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m10-2.5a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m-10 0a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4M2.24 1c1.76 3.7.49 6.46-.69 9.2c-.36.8-.55 1.63-.55 2.5a6 6 0 0 0 6 6c.21-.01.42-.02.63-.05l2.96 2.96L12 23l1.41-1.39l2.96-2.96c.21.03.42.04.63.05a6 6 0 0 0 6-6c0-.87-.19-1.7-.55-2.5C21.27 7.46 20 4.7 21.76 1c-2.64 2.06-6.4 3.69-9.76 3.7C8.64 4.69 4.88 3.06 2.24 1"
        />
    </svg>
);