import { ROBLOX_IMAGE_REVALIDATE_TIMEOUT } from '@/configuration';
import { grabFallbackImage } from '@/lib/image-lib';
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-static'

async function getPlaceThumbnail(universeId: number) {
    try {
        const url = `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`
        const response = await fetch(url, {
            next: {
                revalidate: ROBLOX_IMAGE_REVALIDATE_TIMEOUT
            }
        });
        const data = await response.json();
        
        if (data.data && data.data.length > 0 && data.data[0].thumbnails && data.data[0].thumbnails.length > 0) {
            const thumbnail = data.data[0].thumbnails[0];
            if (thumbnail.state === "Completed" && thumbnail.imageUrl) {
                const imageResponse = await fetch(thumbnail.imageUrl, {
                    next: {
                        revalidate: ROBLOX_IMAGE_REVALIDATE_TIMEOUT
                    }
                });
                const arrayBuffer = await imageResponse.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                
                return {
                    fileBuffer: buffer,
                    contentType: 'image/png'
                };
            }
        }

        return grabFallbackImage()
    } catch {
        return grabFallbackImage()
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ universeId: string }> }) {
    const { universeId } = await params;

    const parsedUniverseId = Number(universeId);
    if (!Number.isInteger(parsedUniverseId)) {
        return new NextResponse('Invalid universe ID', { status: 400 });
    }

    const { fileBuffer: data, contentType: content_type } = await getPlaceThumbnail(parsedUniverseId);

    // Create a new Response with the image data
    const response = new NextResponse(data, {
        headers: {
            'Content-Type': content_type,
        }
    });
    return response;
}