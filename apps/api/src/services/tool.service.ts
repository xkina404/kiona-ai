import axios from 'axios';

export class ToolService {
  private tools = new Map<string, any>();

  async getAvailableTools() {
    return Array.from(this.tools.values());
  }

  async addTool(name: string, githubUrl: string) {
    try {
      // Clone/fetch from GitHub
      const tool = {
        name,
        githubUrl,
        enabled: true,
        createdAt: new Date().toISOString(),
      };

      this.tools.set(name, tool);
      return tool;
    } catch (error) {
      throw new Error(`Failed to add tool: ${(error as Error).message}`);
    }
  }

  async executeTool(toolName: string, input: any) {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(`Tool ${toolName} not found`);
    }

    // TODO: Execute tool
    return {
      toolName,
      result: null,
    };
  }
}

export function getToolService(): ToolService {
  return new ToolService();
}