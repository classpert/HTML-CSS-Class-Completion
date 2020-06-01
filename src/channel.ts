import { window, OutputChannel } from "vscode";

const channel: OutputChannel = window.createOutputChannel(
  "HTML CSS Class Completion"
);

export default channel;
