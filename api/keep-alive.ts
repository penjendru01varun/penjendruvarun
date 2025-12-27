import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    console.log("Keep-alive cron executed at:", new Date().toISOString());
    response.status(200).json({
        success: true,
        message: "Portfolio is awake and ready!",
        timestamp: new Date().toISOString()
    });
}
