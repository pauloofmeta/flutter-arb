import React from 'react';
import {
  VSCodeButton,
  VSCodeTextField,
} from '@vscode/webview-ui-toolkit/react';

import { Nav, NavActions, NavActionsRight, Title } from './style';

interface ActionProp {
  label: string;
  icon?: string;
  iconBtn?: boolean;
}

function Action({ label, icon, iconBtn }: ActionProp) {
  return (
    <VSCodeButton appearance={iconBtn ? 'icon' : 'primary'} aria-label={label}>
      {!iconBtn && label}
      <span slot="start" className={`codicon codicon-${icon}`} />
    </VSCodeButton>
  );
}

export function Navbar() {
  return (
    <Nav>
      <Title>Flutter Arb Editor</Title>
      <NavActions>
        <VSCodeTextField placeholder="Search">
          <span slot="start" className="codicon codicon-search"></span>
        </VSCodeTextField>

        <NavActionsRight>
          <Action label="Atualizar" icon="refresh" iconBtn />
          <Action label="Save" icon="check" />
          <Action label="Add Language" icon="add" />
        </NavActionsRight>
      </NavActions>
    </Nav>
  );
}
