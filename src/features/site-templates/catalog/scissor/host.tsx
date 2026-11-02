'use client'
import { createContext, useContext, type ReactNode } from 'react'
import { brand, type Copy } from './config'
export interface ScissorHostOptions { brandName?: Copy; logo?: string; lightLogo?: string; marketplaceHref?: string; marketplaceLabel?: Copy; marketplaceAriaLabel?: Copy; filing?: ReactNode }
const Context = createContext<ScissorHostOptions>({})
/** 宿主品牌与市场入口只通过此边界注入，通用源码不依赖消费方。 */
export function ScissorHostProvider({children, ...options}: ScissorHostOptions & {children: ReactNode}) { return <Context.Provider value={options}>{children}</Context.Provider> }
export function useScissorHost() { return useContext(Context) }
export function useScissorBrand() { return useContext(Context).brandName ?? brand.name }
