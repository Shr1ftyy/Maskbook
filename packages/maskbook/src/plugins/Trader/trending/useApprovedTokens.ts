import { useCallback, useEffect, useState } from 'react'
import stringify from 'json-stable-stringify'
import { useValueRef } from '../../../utils/hooks/useValueRef'
import { approvedTokensFromUniSwap } from '../settings'
import { UNISWAP_APPROVED_TOKENS_MAX } from '../constants'

export function useApprovedTokens(token_address: string | undefined) {
    const [approvedTokens, setApprovedTokens] = useState<string[]>([])
    const tokens = useValueRef(approvedTokensFromUniSwap)

    const onApprove = useCallback(() => {
        if (!token_address || !token_address.length) return

        const parsed = JSON.parse(tokens) as string[]
        while (parsed.length >= UNISWAP_APPROVED_TOKENS_MAX) parsed.shift()
        parsed.push(token_address)
        approvedTokensFromUniSwap.value = stringify(parsed)
    }, [tokens, token_address])

    useEffect(() => {
        try {
            if (!tokens) approvedTokensFromUniSwap.value = stringify([])
            else setApprovedTokens(JSON.parse(tokens))
        } catch (e) {
            setApprovedTokens([])
        }
    }, [tokens])

    return {
        approvedTokens,
        onApprove,
    }
}
