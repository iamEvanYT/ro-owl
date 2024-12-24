// Settings //
const resizedHeight = 250;
const resizedWidth = 250;

// Code //
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { ROBLOX_IMAGE_REVALIDATE_TIMEOUT } from "@/configuration";

type ImageData = {
    fileBuffer: Buffer;
    contentType: string
}

type ImageCache = {
    [assetId: string]: ImageData;
}

const imageCache: ImageCache = {};
const resizedImageCache: ImageCache = {};

function getImageContentType(buffer: Buffer) {
    const magicNumbers = {
        'image/jpg': ['ffd8ff', 'ffd8ffe0', 'ffd8ffe1'], // Added variations for JPEG
        'image/png': '89504e47',
        'image/gif': '47494638',
        'image/bmp': '424d'
    };

    const magicNumber = buffer.toString('hex', 0, 4); // Convert to hex

    // Loop through the magic numbers to find a match
    for (const [type, signature] of Object.entries(magicNumbers)) {
        if (Array.isArray(signature)) {
            // If the signature is an array, check each variant
            for (const variant of signature) {
                if (magicNumber.startsWith(variant)) {
                    return type; // Return the type if a variant matches
                }
            }
        } else {
            // If the signature is a string, check directly
            if (magicNumber.startsWith(signature)) {
                return type;
            }
        }
    }

    return null; // Return null if no image type matches
}

export async function resizeAndPadImageBuffer(inputBuffer: Buffer, targetWidth: number, targetHeight: number) {
    try {
        // Step 1: Resize the image with aspect ratio preservation
        return await sharp(inputBuffer)
            .resize({
                width: targetWidth,
                height: targetHeight,
                fit: 'contain', // Preserves aspect ratio and ensures image fits within the specified dimensions
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toBuffer();
    } catch (error) {
        console.error('Error resizing and padding image:', error);
        return null
    }
}

const fallbackImagePath = path.join(process.cwd(), "public", 'assets', 'question-mark.png');
const fallbackImageBuffer = fs.readFileSync(fallbackImagePath)
export function grabFallbackImage(): ImageData {
    return {
        fileBuffer: fallbackImageBuffer,
        contentType: 'image/png'
    };
}

export async function grabImage(assetId: number | string) {
    if (typeof assetId == "string") {
        assetId = parseInt(assetId)
    }

    // Check if the image is already in the cache.
    if (imageCache[assetId]) {
        return imageCache[assetId];
    }

    try {
        // Fetch the image if not in cache.
        const response = await fetch(`https://assetdelivery.roblox.com/v1/asset/?ID=${assetId}`, {
            next: {
                revalidate: ROBLOX_IMAGE_REVALIDATE_TIMEOUT
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();

        // Grab Real Content-Type
        const fileBuffer = Buffer.from(arrayBuffer);
        const contentType = getImageContentType(fileBuffer)
        if (!contentType) {
            throw new Error("Not an image!")
        }

        // Cache the image data and content type.
        const imageData = {
            fileBuffer,
            contentType
        };
        imageCache[assetId] = imageData;

        return imageData;
    } catch (error) {
        return grabFallbackImage()
    }
}

export async function grabResizedImage(assetId: number) {
    // Check if the image is already in the cache.
    if (resizedImageCache[assetId]) {
        return resizedImageCache[assetId];
    }

    try {
        // Fetch the image data if not in cache.
        const { fileBuffer: imageBuffer, contentType: content_type } = await grabImage(assetId)

        // Resize and cache the resized image & data.
        const resizedImageBuffer = await resizeAndPadImageBuffer(imageBuffer, resizedWidth, resizedHeight)
        if (!resizedImageBuffer) {
            return grabFallbackImage()
        }

        const resizedImageData = {
            fileBuffer: resizedImageBuffer,
            contentType: content_type
        };
        resizedImageCache[assetId] = resizedImageData;

        return resizedImageData
    } catch (error) {
        return grabFallbackImage()
    }
}