import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Table } from '../components/Table';
import { useCommands } from '../contexts/CommandsContext';
import { COMMANDS } from '../constants';
import { Loading } from '../components/Loading';

export const MainPage = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [langs, setLangs] = useState<string[]>([]);
  const { sendMessage, message, loading } = useCommands();

  useEffect(() => {
    if (message?.command === COMMANDS.loadResources) {
      const { resources, langs } = message.data;
      setResources(resources);
      setLangs(langs);
    }
  }, [message]);

  const handleLoad = () => {
    sendMessage({ command: COMMANDS.loadResources });
  };

  const handleAddLanguage = () => {
    sendMessage({ command: COMMANDS.addLanguage }, false);
  };

  useEffect(() => handleLoad(), []);

  return (
    <main>
      <Navbar onRefresh={handleLoad} onAddLanguage={handleAddLanguage} />
      {loading ? <Loading /> : <Table items={resources} langs={langs} />}
    </main>
  );
};
