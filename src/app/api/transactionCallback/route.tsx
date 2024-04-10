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

    return new NextResponse(`<!DOCTYPE html><html><head>
        <title>This is frame after success</title>
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/park-1.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/park-1.png" />
      </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = "force-dynamic";
