import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Basic Frame",
    description: "A Farcaster Frame Demo",
    openGraph: {
        title: "Basic Frame",
        description: "A Farcaster Frame Demo",
        images: [`${process.env.NEXT_PUBLIC_SITE_URL}/site-preview.jpg`],
    },
    other: {
        "fc:frame": "vNext",
        "fc:frame:image": `${process.env.NEXT_PUBLIC_SITE_URL}/site-preview.jpg`,
        "fc:frame:button:1:action": `tx`,
        "fc:frame:button:1:target": `${process.env.NEXT_PUBLIC_SITE_URL}/api/getTransactionData`,
        "fc:frame:button:1:post_url": `${process.env.NEXT_PUBLIC_SITE_URL}/api/transactionCallback`,

        "fc:frame:button:1": "Transact",
    },
};

export default function Page() {
    return (
        <div>
            <h1>Basic Frame</h1>
        </div>
    );
}
