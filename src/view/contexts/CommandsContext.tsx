import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface CommandEvent {
  command: string;
  data?: any;
}

type CommandsContextType = {
  sendMessage: (event: CommandEvent, waitRetrun?: boolean) => void;
  message?: CommandEvent;
  loading: boolean;
};

const CommandsContext = createContext<CommandsContextType>(null!);

const CommandsProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<CommandEvent>(null!);
  const [loading, setLoading] = useState(false);

  const sendMessage = (
    { command, data }: CommandEvent,
    waitRetrun: boolean = true
  ) => {
    if (waitRetrun) {
      setLoading(true);
    }
    vscode.postMessage({ command, data });
  };

  const handleExtensionMessage = (event: MessageEvent) => {
    const message = event.data as CommandEvent;
    setMessage(message);
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener('message', handleExtensionMessage);
  }, []);

  const value = { sendMessage, message, loading };

  return (
    <CommandsContext.Provider value={value}>
      {children}
    </CommandsContext.Provider>
  );
};

const useCommands = () => useContext(CommandsContext);

export { CommandsProvider, useCommands };
