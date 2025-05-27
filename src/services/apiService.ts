
interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: Date;
  category: 'personal' | 'work' | 'creative' | 'tech' | 'business';
}

type CreateIdeaData = Omit<Idea, 'id' | 'createdAt'>;
type UpdateIdeaData = Omit<Idea, 'id' | 'createdAt'>;

// Use Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}/api${endpoint}`;

    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }

      return (await response.text()) as unknown as T;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  async getAllIdeas(): Promise<Idea[]> {
    const ideas = await this.request<Array<Omit<Idea, 'createdAt'> & { createdAt: string }>>('/ideas');
    return ideas.map(idea => ({
      ...idea,
      createdAt: new Date(idea.createdAt),
    }));
  }

  async createIdea(ideaData: CreateIdeaData): Promise<Idea> {
    const idea = await this.request<Omit<Idea, 'createdAt'> & { createdAt: string }>('/ideas', {
      method: 'POST',
      body: JSON.stringify(ideaData),
    });

    return {
      ...idea,
      createdAt: new Date(idea.createdAt),
    };
  }

  async updateIdea(id: string, ideaData: UpdateIdeaData): Promise<Idea> {
    const idea = await this.request<Omit<Idea, 'createdAt'> & { createdAt: string }>(`/ideas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ideaData),
    });

    return {
      ...idea,
      createdAt: new Date(idea.createdAt),
    };
  }

  async deleteIdea(id: string): Promise<void> {
    await this.request<void>(`/ideas/${id}`, {
      method: 'DELETE',
    });
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export type { Idea, CreateIdeaData, UpdateIdeaData };
