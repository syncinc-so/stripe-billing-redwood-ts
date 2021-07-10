import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const products = () => {
  return db.product.findMany()
}

export const Product = {
  plan: (_obj, { root }: ResolverArgs<ReturnType<typeof product>>) =>
    db.product.findUnique({ where: { id: root.id } }).plan(),
  price: (_obj, { root }: ResolverArgs<ReturnType<typeof product>>) =>
    db.product.findUnique({ where: { id: root.id } }).price(),
  sku: (_obj, { root }: ResolverArgs<ReturnType<typeof product>>) =>
    db.product.findUnique({ where: { id: root.id } }).sku(),
}
