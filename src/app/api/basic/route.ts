import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { getUserDataForFid } from "frames.js";
import { getFrameMessage } from "@coinbase/onchainkit";

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();

    const { untrustedData, trustedData } = body; // The data received from frame consist of untrustedData and trustedData.Explore documentation for more,

    console.log("body", body);

    const { isValid, message } = await getFrameMessage(body, {
        allowFramegear: true,
    });

    if (!isValid) {
        return new NextResponse(
            getFrameHtmlResponse({
                image: { src: `${process.env.NEXT_PUBLIC_SITE_URL}/error.png` },
            })
        );
    }

    const userDataFromFID = await getUserDataForFid({
        fid: untrustedData.fid,
    });

    console.log("userDataFromFID", userDataFromFID);

    //     return new NextResponse(`<!DOCTYPE html><html><head>
    //     <title>This is frame ${id}</title>
    //     <meta property="og:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/park-${id}.png" />
    //     <meta property="fc:frame" content="vNext" />
    //     <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/park-${id}.png" />
    //     <meta property="fc:frame:button:1" content="Next Page" />
    //     <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_SITE_URL}/api/basic?id=${nextId}" />
    //   </head></html>`);

    let toReturnJSON = {
        chainId: "eip155:11155111",
        method: "eth_sendTransaction", //method Id or function selector
        params: {
            abi: [
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "recipient",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "amount",
                            type: "uint256",
                        },
                    ],
                    name: "transfer",
                    outputs: [
                        {
                            internalType: "bool",
                            name: "",
                            type: "bool",
                        },
                    ],
                    stateMutability: "external",
                    type: "function",
                },
            ], // JSON ABI of the function selector and any errors
            to: "0x381aF7f771E3939dd4037E572D1C5e4b31d4e5Ee",
            data: "0xa9059cbb000000000000000000000000042cc83d85b4d0f53844036ac5bbccb14ff48b900000000000000000000000000000000000000000000000000000000000a7d8c0",
            value: "1000000",
        },
    };

    console.log("toReturnJSON", toReturnJSON);
    return new NextResponse(JSON.stringify(toReturnJSON));
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = "force-dynamic";
