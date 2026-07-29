import type { Value } from '~/types'

export type EqualityKind = 'strict' | 'loose' | 'none'

export function getEqualityKind(a: Value, b: Value): EqualityKind {
  if (a === b)
    return 'strict'
  // eslint-disable-next-line eqeqeq
  if (a == b)
    return 'loose'
  return 'none'
}

export const equalityMeta: Record<EqualityKind, { class: string, icon: string, label: string }> = {
  strict: { class: 'color-red', icon: 'i-ic:round-equals', label: '严格相等' },
  loose: { class: 'color-blue', icon: 'i-mdi:approximately-equal', label: '宽松相等' },
  none: { class: 'color-green', icon: 'i-ic:round-not-equal', label: '不相等' },
}

export const equalityOrder: EqualityKind[] = ['none', 'loose', 'strict']
