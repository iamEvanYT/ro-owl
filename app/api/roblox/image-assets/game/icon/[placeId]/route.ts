import { ROBLOX_IMAGE_REVALIDATE_TIMEOUT } from '@/configuration';
import { grabFallbackImage } from '@/lib/image-lib';
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-static'

async function getPlaceIcon(placeId: number) {
    try {
        const url = `https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${placeId}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`
        const response = await fetch(url, {
            next: {
                revalidate: ROBLOX_IMAGE_REVALIDATE_TIMEOUT
            }
        });
        const data = await response.json();
        
        if (data.data && data.data.length > 0 && data.data[0].imageUrl) {
            const imageResponse = await fetch(data.data[0].imageUrl, {
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

        return grabFallbackImage()
    } catch {
        return grabFallbackImage()
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ placeId: string }> }) {
    const { placeId } = await params;

    const parsedPlaceId = Number(placeId);
    if (!Number.isInteger(parsedPlaceId)) {
        return new NextResponse('Invalid place ID', { status: 400 });
    }

    const { fileBuffer: data, contentType: content_type } = await getPlaceIcon(parsedPlaceId);

    // Create a new Response with the image data
    const response = new NextResponse(data, {
        headers: {
            'Content-Type': content_type,
        }
    });
    return response;
}