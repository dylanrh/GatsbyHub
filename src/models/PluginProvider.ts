import * as vscode from 'vscode';
import Plugin from './Plugin';
import PluginData from './PluginData';

export default class PluginProvider implements vscode.TreeDataProvider<Plugin> {
  data: any;

  constructor() {
    this.data = this.createPlugins();
    this.createPlugins = this.createPlugins.bind(this);
  }

  async createPlugins() {
    return (await PluginData.getPlugins()).map((obj) => new Plugin(obj.name));
  }

  getTreeItem(element: Plugin): Plugin | Promise<Plugin> {
    return element;
  }

  getChildren(element?: Plugin | undefined) {
    if (!element) {
      return this.data;
    }
    return element.children;
  }
}