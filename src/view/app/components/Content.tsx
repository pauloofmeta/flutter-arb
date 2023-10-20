import React from 'react';
import { Navbar } from './Navbar';
import { Table } from './Table';

export function Content() {
  const resources = [
    {
      key: 'abc',
      pt: 'Abc',
      en: 'AbC',
      es: 'SBc',
    },
    {
      key: 'main_menu_open',
      pt: 'Menu Pincipal',
      en: 'Main Menu',
      es: 'Menú',
    },
    {
      key: 'main_menu_open',
      pt: 'Menu Pincipal',
      en: 'Main Menu',
      es: 'Menú',
    },
    {
      key: 'main_menu_open',
      pt: 'Menu Pincipal',
      en: 'Main Menu',
      es: 'Menú',
    },
  ];

  const langs = ['pt', 'en', 'es'];

  return (
    <main>
      <Navbar />
      <Table items={resources} langs={langs} />
    </main>
  );
}
