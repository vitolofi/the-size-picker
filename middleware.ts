import { NextRequest, NextResponse } from 'next/server'
import { createClient, parseConnectionString } from '@vercel/edge-config'
// import { get } from '@vercel/edge-config';

interface FeatureFlags {
  storeClosed: boolean
}

// We use prefixes to avoid mixing up the flags with other Edge Config values
const prefixKey = (key: string) => `featureFlagsAppleStore_${key}`



export const config = {
  matcher: '/result/:path*',
}

export async function middleware(req: NextRequest) {
  async function get(key: keyof FeatureFlags) {
    const prefixedKey = prefixKey(key)
    const edgeConfig = createClient(process.env.EDGE_CONFIG)
    const featureFlag = await edgeConfig.get(prefixedKey)
    return featureFlag
  }
    // console.log('edge',process.env.EDGE_CONFIG)
  // for demo purposes, warn when there is no EDGE_CONFIG
  if (
    !process.env.EDGE_CONFIG ||
    !parseConnectionString(process.env.EDGE_CONFIG)
  ) {
    // req.nextUrl.pathname = '/medidas/NotFound'
    // return NextResponse.rewrite(req.nextUrl)
  }


  try {
    // console.log('test value ' , await get('storeClosed'))
    if (await get('storeClosed') === "true" ) {
        // console.log('test value inside if ' , await get('storeClosed'))
        
      req.nextUrl.pathname = `/medidas/NotFound`
      return NextResponse.redirect(req.nextUrl)
    }
  } catch (error) {
    console.error(error)
  }
}
