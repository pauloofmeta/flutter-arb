"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const react_1 = require("react");
const react_2 = require("@vscode/webview-ui-toolkit/react");
function Navbar() {
    return (<nav>
            <div>Flutter Arb Editor</div>
            <div>
                <react_2.VSCodeTextField placeholder="Search">
                    <span slot="start" className="codicon codicon-search"></span>
                </react_2.VSCodeTextField>
                <react_2.VSCodeButton>
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
            </div>
        </nav>);
}
exports.Navbar = Navbar;
//# sourceMappingURL=Navbar.js.map