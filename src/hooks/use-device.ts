"use client"

import {useEffect, useState} from 'react'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export interface DeviceInfo {
    type: DeviceType
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    width: number
    height: number
}

const BREAKPOINTS = {
    mobile: 768,
    medium: 1000,
    tablet: 1024,
} as const

function getDeviceType(width: number): DeviceType {
    if (width < BREAKPOINTS.mobile) return 'mobile'
    if (width < BREAKPOINTS.tablet) return 'tablet'
    return 'desktop'
}

export function useDevice(): DeviceInfo {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
        if (typeof window === 'undefined') {
            return {
                type: 'desktop',
                isMobile: false,
                isTablet: false,
                isDesktop: true,
                width: 0,
                height: 0,
            }
        }

        const width = window.innerWidth
        const height = window.innerHeight
        const type = getDeviceType(width)

        return {
            type,
            isMobile: type === 'mobile',
            isTablet: type === 'tablet',
            isDesktop: type === 'desktop',
            width,
            height,
        }
    })

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth
            const height = window.innerHeight
            const type = getDeviceType(width)

            setDeviceInfo({
                type,
                isMobile: type === 'mobile',
                isTablet: type === 'tablet',
                isDesktop: type === 'desktop',
                width,
                height,
            })
        }

        window.addEventListener('resize', handleResize)

        // Call once to set initial value
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return deviceInfo
}
