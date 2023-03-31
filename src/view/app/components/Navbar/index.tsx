import React from "react";
import { VSCodeButton, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

import { Nav, NavActions, NavActionsRight, Title } from "./style";

export function Navbar() {
    return (
        <Nav>
            <Title>Flutter Arb Editor</Title>
            <NavActions>
                <VSCodeTextField placeholder="Search">
                    <span slot="start" className="codicon codicon-search"></span>
                </VSCodeTextField>

                <NavActionsRight>
                    <VSCodeButton appearance="icon" aria-label="Atualizar">
                        <span slot="start" className="codicon codicon-refresh"></span>
                    </VSCodeButton>
                    <VSCodeButton>
                        Save
                        <span slot="start" className="codicon codicon-check"></span>
                    </VSCodeButton>
                    <VSCodeButton>
                        Generate
                        <span slot="start" className="codicon codicon-verified"></span>
                    </VSCodeButton>
                </NavActionsRight>
            </NavActions>
        </Nav>
    );
}