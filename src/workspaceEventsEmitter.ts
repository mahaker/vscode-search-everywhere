import * as vscode from "vscode";
import { Action } from "./types";

export const onWillProcessingEventEmitter: vscode.EventEmitter<void> =
  new vscode.EventEmitter();
export const onDidProcessingEventEmitter: vscode.EventEmitter<void> =
  new vscode.EventEmitter();
export const onWillExecuteActionEventEmitter: vscode.EventEmitter<Action> =
  new vscode.EventEmitter();
export const onDidDebounceConfigToggleEventEmitter: vscode.EventEmitter<void> =
  new vscode.EventEmitter();
export const onWillReindexOnConfigurationChangeEventEmitter: vscode.EventEmitter<void> =
  new vscode.EventEmitter();
export const onDidGroupingConfigToggleEventEmitter: vscode.EventEmitter<void> =
  new vscode.EventEmitter();
export const onWillProcessing: vscode.Event<void> =
  onWillProcessingEventEmitter.event;
export const onDidProcessing: vscode.Event<void> =
  onDidProcessingEventEmitter.event;
export const onWillExecuteAction: vscode.Event<Action> =
  onWillExecuteActionEventEmitter.event;
export const onDidDebounceConfigToggle: vscode.Event<void> =
  onDidDebounceConfigToggleEventEmitter.event;
export const onWillReindexOnConfigurationChange: vscode.Event<void> =
  onWillReindexOnConfigurationChangeEventEmitter.event;
export const onDidGroupingConfigToggle: vscode.Event<void> =
  onDidGroupingConfigToggleEventEmitter.event;
