import { apiService } from '../apiService';
import type { CreateIdeaData, UpdateIdeaData } from '../apiService';

// Mock base URL para os testes
process.env.VITE_API_URL = 'http://localhost:3001';

// Mock global.fetch
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllIdeas', () => {
    it('should fetch all ideas successfully', async () => {
      const mockResponse = [
        {
          id: '1',
          title: 'Test Idea',
          description: 'Test description',
          category: 'personal',
          tags: ['test'],
          createdAt: '2024-01-01T10:00:00Z',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: () => 'application/json',
        },
        json: async () => mockResponse,
      } as unknown as Response);

      const result = await apiService.getAllIdeas();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/ideas',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(result).toEqual([
        expect.objectContaining({
          id: '1',
          title: 'Test Idea',
          createdAt: expect.any(Date),
        }),
      ]);
    });

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      } as unknown as Response);

      await expect(apiService.getAllIdeas()).rejects.toThrow('HTTP error! status: 500');
    });
  });

  describe('createIdea', () => {
    it('should create idea successfully', async () => {
      const newIdea: CreateIdeaData = {
        title: 'New Idea',
        description: 'New description',
        category: 'work',
        tags: ['new'],
      };

      const mockResponse = {
        id: '2',
        ...newIdea,
        createdAt: '2024-01-01T11:00:00Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: () => 'application/json',
        },
        json: async () => mockResponse,
      } as unknown as Response);

      const result = await apiService.createIdea(newIdea);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/ideas',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newIdea),
        })
      );
      expect(result.id).toBe('2');
      expect(result.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('updateIdea', () => {
    it('should update idea successfully', async () => {
      const updateData: UpdateIdeaData = {
        title: 'Updated Idea',
        description: 'Updated description',
        category: 'tech',
        tags: ['updated'],
      };

      const mockResponse = {
        id: '1',
        ...updateData,
        createdAt: '2024-01-01T10:00:00Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: () => 'application/json',
        },
        json: async () => mockResponse,
      } as unknown as Response);

      const result = await apiService.updateIdea('1', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/ideas/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData),
        })
      );
      expect(result.title).toBe('Updated Idea');
    });
  });

  describe('deleteIdea', () => {
    it('should delete idea successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        headers: {
          get: () => '',
        },
        text: async () => '',
      } as unknown as Response);

      await apiService.deleteIdea('1');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/ideas/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('healthCheck', () => {
    it('should return health status', async () => {
      const mockResponse = {
        status: 'OK',
        timestamp: '2024-01-01T10:00:00Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: () => 'application/json',
        },
        json: async () => mockResponse,
      } as unknown as Response);

      const result = await apiService.healthCheck();

      expect(result).toEqual(mockResponse);
    });
  });
});
