/**
 * Displays an ASCII art banner when the server starts
 * @param port The port number the server is running on
 */
export const displayBanner = (port: string | number): void => {
const banner = `
██╗███████╗ ██████╗ ████████╗███████╗██╗  ██╗
██║██╔════╝██╔═══██╗╚══██╔══╝██╔════╝██║ ██╔╝
██║███████╗██║   ██║   ██║   █████╗  █████╔╝ 
██║╚════██║██║   ██║   ██║   ██╔══╝  ██╔═██╗ 
██║███████║╚██████╔╝   ██║   ███████╗██║  ██╗
╚═╝╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝
                                                                                            
🌎 | Server running on http://localhost:${port}
📅 | ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
🚀 | API v1.0.0
`;

  console.log('\x1b[34m%s\x1b[0m', banner); // Blue color
};

export const displayStartupInfo = (port: string | number): void => {
  console.log('\x1b[32m%s\x1b[0m', `🗄️  | Connected to MongoDB Database successfully`);
  console.log('\x1b[34m%s\x1b[0m', `🌎 | App Started on http://localhost:${port}`);
  console.log('\x1b[35m%s\x1b[0m', `⚡ | Server initialized and ready to handle requests`);
};