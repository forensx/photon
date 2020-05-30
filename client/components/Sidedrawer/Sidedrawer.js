/** IMPORTS */
import React, { useState } from 'react';

import Search from '../CitySearch/Search'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

export default function SideDrawer() {

    const [expanded, setExpanded] = useState(true);

    return (
        <div style={{ height: "100%", width: "100%", backgroundColor: "white", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
            <div style={{ display: "flex", top: "5%", width: "5%", height: "5%", position: "relative" }}>
                <MenuFoldOutlined style={{ fontSize: "3em" }} />
                <h1>Proton: Nighttime Light Imagery</h1>
            </div>
            <div style={{ position: 'relative' }}>
                <Search />
            </div>

        </div>
    )
}