"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const react_1 = require("react");
const react_2 = require("@vscode/webview-ui-toolkit/react");
const style_1 = require("./style");
function Navbar() {
    return (<style_1.Nav>
            <style_1.Title>Flutter Arb Editor</style_1.Title>
            <style_1.NavActions>
                <react_2.VSCodeTextField placeholder="Search">
                    <span slot="start" className="codicon codicon-search"></span>
                </react_2.VSCodeTextField>

                <style_1.NavActionsRight>
                    <react_2.VSCodeButton appearance="icon" aria-label="Atualizar">
                        <span slot="start" className="codicon codicon-refresh"></span>
                    </react_2.VSCodeButton>
                    <react_2.VSCodeButton>
                        Save
                        <span slot="start" className="codicon codicon-check"></span>
                    </react_2.VSCodeButton>
                    <react_2.VSCodeButton>
                        Generate
                        <span slot="start" className="codicon codicon-verified"></span>
                    </react_2.VSCodeButton>
                </style_1.NavActionsRight>
            </style_1.NavActions>
        </style_1.Nav>);
}
exports.Navbar = Navbar;
//# sourceMappingURL=index.js.map