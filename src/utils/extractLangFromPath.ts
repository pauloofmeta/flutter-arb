const extractLangFromPath = (path: string): string => {
  const fileName = path.substring(path.lastIndexOf('/') + 1, path.length + 1);

  return fileName.substring(0, fileName.indexOf('.arb'));
};

export default extractLangFromPath;
