'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

// The package reads navigator during render, so it must only render in the browser.
const LiquidGlass = dynamic(() => import('liquid-glass-react'), { ssr: false })

type GlassBackdropProps = {
  className?: string
  displacementScale?: number
  blurAmount?: number
  saturation?: number
  cornerRadius?: number
}

export function GlassBackdrop({
  className = '',
  displacementScale = 50,
  blurAmount = 0.08,
  saturation = 140,
  cornerRadius = 16,
}: GlassBackdropProps) {
  return (
    <div className={`liquid-backdrop ${className}`} aria-hidden="true">
      <LiquidGlass
        className="liquid-backdrop-inner"
        style={{ position: 'absolute', top: '50%', left: '50%' }}
        displacementScale={displacementScale}
        blurAmount={blurAmount}
        saturation={saturation}
        aberrationIntensity={2}
        elasticity={0.1}
        cornerRadius={cornerRadius}
        padding="0"
      >
        <span />
      </LiquidGlass>
    </div>
  )
}

type GlassActionProps = {
  children: ReactNode
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export function GlassAction({ children, href, type = 'button', disabled = false, className = '', onClick }: GlassActionProps) {
  const content = href ? (
    <a href={href} className="glass-action-content" onClick={onClick}>{children}</a>
  ) : (
    <button type={type} disabled={disabled} className="glass-action-content" onClick={onClick}>{children}</button>
  )

  return (
    <div className={`liquid-action-wrap ${className} ${disabled ? 'is-disabled' : ''}`}>
      <div className="liquid-action-visual" aria-hidden="true">
        <LiquidGlass
          className="liquid-action"
          style={{ position: 'absolute', top: '50%', left: '50%' }}
          displacementScale={70}
          blurAmount={0.08}
          saturation={140}
          aberrationIntensity={2}
          elasticity={0.35}
          cornerRadius={100}
          padding="0"
        >
          <span />
        </LiquidGlass>
      </div>
      {content}
    </div>
  )
}
