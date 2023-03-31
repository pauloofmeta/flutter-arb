"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavActionsRight = exports.NavActions = exports.Title = exports.Nav = void 0;
const styled_components_1 = require("styled-components");
exports.Nav = styled_components_1.default.nav `
    width: 100%;
`;
exports.Title = styled_components_1.default.div `
    font-weight: bold;
    padding: 10px 0px;
    font-size: 23px;
`;
exports.NavActions = styled_components_1.default.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
exports.NavActionsRight = styled_components_1.default.div `
    display: flex;
    flex-direction: row;
    gap: 5px;
`;
//# sourceMappingURL=style.js.map