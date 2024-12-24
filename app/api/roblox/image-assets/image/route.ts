import { grabImage } from '@/lib/image-lib';
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-static'

export async function GET(request: NextRequest, { params }: { params: Promise<{ assetId: string }> }) {
    const { assetId } = await params;

    const { fileBuffer: data, contentType: content_type } = await grabImage(assetId);

    // Create a new Response with the image data
    const response = new NextResponse(data, {
        headers: {
            'Content-Type': content_type,
        }
    });
    return response;
}