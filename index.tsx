/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

function WitheredFoxy() {
    return <>
        <img
            src="https://i.imgur.com/bGGEAtL.gif"
            id="foxy-jumpscare"
            style={{
                position: "absolute",
                inset: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 1000000
            }}
        />
        <audio src="https://i.imgur.com/Mbfzdyn.mp4" autoPlay />
    </>;
}

export const settings = definePluginSettings({
    chance: {
        description: "1 in X chance",
        type: OptionType.NUMBER,
        default: 1000,
    }
});

export default definePlugin({
    name: "WitheredFoxyJumpscare",
    description: "Some actions now have a 1/1000 chance to be much funnier than before",

    authors: [
        {
            name: "MrDiamond",
            id: 523338295644782592n
        }
    ],

    settings,

    renderWitheredFoxy() {
        const { chance } = settings.store;
        if (Math.random() <= 1 / chance)
            return <WitheredFoxy />;
        return null;
    },

    patches: [
        {
            find: ".stackingBehavior&&(",
            replacement: {
                match: /\.inactive\),children:(\i)/,
                replace: ".inactive),children:[$1,$self.renderWitheredFoxy()]"
            }
        }
    ]
});
