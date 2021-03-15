import type { SocialNetwork } from '../../social-network-next/types'
import { facebookBase } from './base'
import { getPostUrlAtFacebook, isValidFacebookUsername } from './utils/parse-username'
import { PostIdentifier, ProfileIdentifier } from '@dimensiondev/maskbook-shared'

export const facebookShared: SocialNetwork.Shared & SocialNetwork.Base = {
    ...facebookBase,
    utils: {
        getHomePage: () => 'https://www.facebook.com',
        isValidUsername: (v) => !!isValidFacebookUsername(v),
        publicKeyEncoding: undefined,
        textPayloadPostProcessor: undefined,
        getPostURL(post) {
            if (post.identifier instanceof ProfileIdentifier)
                return new URL(getPostUrlAtFacebook(post as PostIdentifier<ProfileIdentifier>))
            return null
        },
        getShareLinkURL(message) {
            return new URL(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(message)}&u=mask.io`)
        },
    },
}
