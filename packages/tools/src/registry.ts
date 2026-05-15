import { Tool } from '@kiona/core';

export abstract class BaseTool implements Tool {
  abstract name: string;
  abstract description: string;
  abstract execute(input: any): Promise<any>;
}

export class MathTool extends BaseTool {
  name = 'math';
  description = 'Perform mathematical calculations';

  async execute(input: { expression: string }): Promise<any> {
    try {
      // Use Function to safely evaluate mathematical expressions
      const result = Function('"use strict"; return (' + input.expression + ')')();
      return { result };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }
}

export class CodeExecutionTool extends BaseTool {
  name = 'code';
  description = 'Execute JavaScript code';

  async execute(input: { code: string }): Promise<any> {
    try {
      const result = Function(input.code)();
      return { result };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }
}

export class DuckDuckGoSearchTool extends BaseTool {
  name = 'ddg-search';
  description = 'Search the web using DuckDuckGo';

  async execute(input: { query: string }): Promise<any> {
    try {
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(input.query)}&format=json`
      );
      const data = await response.json();
      return {
        results: (data.Results || []).map((r: any) => ({
          title: r.Result,
          url: r.FirstURL,
          snippet: r.FirstURL,
        })),
      };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }
}

export class ToolRegistry {
  private tools: Map<string, Tool> = new Map();

  registerTool(tool: Tool): void {
    this.tools.set(tool.name, tool);
  }

  async executeTool(name: string, input: any): Promise<any> {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`Tool ${name} not found`);
    return tool.execute(input);
  }

  getTool(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  listTools(): Tool[] {
    return Array.from(this.tools.values());
  }

  static createDefaultRegistry(): ToolRegistry {
    const registry = new ToolRegistry();
    registry.registerTool(new MathTool());
    registry.registerTool(new CodeExecutionTool());
    registry.registerTool(new DuckDuckGoSearchTool());
    return registry;
  }
}
