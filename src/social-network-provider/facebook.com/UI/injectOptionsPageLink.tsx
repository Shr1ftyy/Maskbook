import React from 'react'
import { LiveSelector, MutationObserverWatcher } from '@holoflows/kit'
import { renderInShadowRoot } from '../../../utils/jss/renderInShadowRoot'
import { makeStyles, Box } from '@material-ui/core'
import Services from '../../../extension/service'
import { MaskbookIcon } from '../../../resources/Maskbook-Circle-WhiteGraph-BlueBackground'
import { DashboardRoute } from '../../../extension/options-page/Route'
import { PreferShadowRootMode } from '../../../utils/constants'

const settings = new LiveSelector().querySelector('.mSideMenu').enableSingleMode()
export function injectOptionsPageLinkAtFacebook() {
    if (location.hostname !== 'm.facebook.com') return
    const watcher = new MutationObserverWatcher(settings)
        .setDOMProxyOption({
            beforeShadowRootInit: { mode: PreferShadowRootMode },
        })
        .startWatch({ subtree: true, childList: true })
    renderInShadowRoot(<Link></Link>, {
        shadow: () => watcher.firstDOMProxy.beforeShadow,
        normal: () => watcher.firstDOMProxy.before,
    })
}

const useStyle = makeStyles({
    root: {
        display: 'flex',
        minHeight: 42,
        lineHeight: '42px',
        fontSize: '1rem',
        borderBottom: '1px solid rgb(233, 234, 237)',
        width: '100%',
        height: 34,
    },
    icon: {
        width: 34,
        height: 34,
        margin: '4px 5px 0 7px',
    },
})
function Link() {
    const classes = useStyle()
    return (
        <Box
            className={classes.root}
            onClick={() => {
                Services.Welcome.openOptionsPage()
            }}>
            <MaskbookIcon className={classes.icon} />
            Maskbook Settings
        </Box>
    )
}
