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
  onClick?: () => void;
}

function Action({ label, icon, iconBtn, onClick }: ActionProp) {
  return (
    <VSCodeButton
      appearance={iconBtn ? 'icon' : 'primary'}
      aria-label={label}
      onClick={onClick}
    >
      {!iconBtn && label}
      <span slot="start" className={`codicon codicon-${icon}`} />
    </VSCodeButton>
  );
}

export interface NavbarProps {
  onRefresh?: () => void;
  onSave?: () => void;
  onAddLanguage?: () => void;
}

export function Navbar({ onRefresh, onSave, onAddLanguage }: NavbarProps) {
  return (
    <Nav>
      <Title>Flutter Arb Editor</Title>
      <NavActions>
        <VSCodeTextField placeholder="Search">
          <span slot="start" className="codicon codicon-search"></span>
        </VSCodeTextField>

        <NavActionsRight>
          <Action
            label="Atualizar"
            icon="refresh"
            iconBtn
            onClick={onRefresh}
          />
          <Action label="Save" icon="check" onClick={onSave} />
          <Action label="Add Language" icon="add" onClick={onAddLanguage} />
        </NavActionsRight>
      </NavActions>
    </Nav>
  );
}
