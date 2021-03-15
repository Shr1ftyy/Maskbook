import { compressSecp256k1Key } from '../../../utils/type-transform/SECP256k1-Compression'
import { ProfileIdentifier, PersonaIdentifier } from '../../../database/type'
import { encodePublicKeyWorker } from '../../../social-network-next/utils/text-payload-worker'
import { queryPublicKey } from '../../../database'
//#endregion
//#region ProvePost, create & verify
export async function getMyProveBio(
    whoAmI: ProfileIdentifier | PersonaIdentifier,
    networkIdentifier?: string,
): Promise<string | null> {
    const myIdentity = await queryPublicKey(whoAmI)
    if (!myIdentity) return null
    const compressed = compressSecp256k1Key(myIdentity, 'public')
    // FIXME: wait for #191
    return whoAmI instanceof ProfileIdentifier
        ? (await encodePublicKeyWorker(whoAmI))(compressed)
        : networkIdentifier
        ? (await encodePublicKeyWorker(networkIdentifier))(compressed)
        : compressed
}
