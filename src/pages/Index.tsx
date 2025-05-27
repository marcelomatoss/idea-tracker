import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Lightbulb, Sparkles, Wifi, WifiOff } from 'lucide-react';
import IdeaCard from '@/components/IdeaCard';
import IdeaForm from '@/components/IdeaForm';
import SearchAndFilter from '@/components/SearchAndFilter';
import { useToast } from '@/hooks/use-toast';
import { apiService, type Idea, type CreateIdeaData, type UpdateIdeaData } from '@/services/apiService';

const Index = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const { toast } = useToast();

  // Load ideas from API on component mount
  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      setIsLoading(true);
      const fetchedIdeas = await apiService.getAllIdeas();
      setIdeas(fetchedIdeas);
      setIsOnline(true);
      console.log('Ideas loaded from API:', fetchedIdeas.length);
    } catch (error) {
      console.error('Failed to load ideas:', error);
      setIsOnline(false);
      // Fallback to localStorage if API is not available
      loadIdeasFromLocalStorage();
      toast({
        title: "Modo Offline",
        description: "Conectando ao armazenamento local. Algumas funcionalidades podem estar limitadas.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadIdeasFromLocalStorage = () => {
    const savedIdeas = localStorage.getItem('idea-tracker-ideas');
    if (savedIdeas) {
      const parsedIdeas = JSON.parse(savedIdeas).map((idea: any) => ({
        ...idea,
        createdAt: new Date(idea.createdAt),
      }));
      setIdeas(parsedIdeas);
    }
  };

  const handleCreateIdea = async (ideaData: CreateIdeaData) => {
    try {
      if (isOnline) {
        const newIdea = await apiService.createIdea(ideaData);
        setIdeas([newIdea, ...ideas]);
        toast({
          title: "Ideia criada!",
          description: "Sua nova ideia foi salva com sucesso.",
        });
      } else {
        // Fallback to localStorage
        const newIdea: Idea = {
          ...ideaData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        const updatedIdeas = [newIdea, ...ideas];
        setIdeas(updatedIdeas);
        localStorage.setItem('idea-tracker-ideas', JSON.stringify(updatedIdeas.map(idea => ({
          ...idea,
          createdAt: idea.createdAt.toISOString()
        }))));
        toast({
          title: "Ideia criada (offline)!",
          description: "Sua ideia foi salva localmente.",
        });
      }
    } catch (error) {
      console.error('Failed to create idea:', error);
      toast({
        title: "Erro",
        description: "Falha ao criar a ideia. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateIdea = async (ideaData: UpdateIdeaData) => {
    if (!editingIdea) return;

    try {
      if (isOnline) {
        const updatedIdea = await apiService.updateIdea(editingIdea.id, ideaData);
        setIdeas(ideas.map(idea => 
          idea.id === editingIdea.id ? updatedIdea : idea
        ));
        toast({
          title: "Ideia atualizada!",
          description: "Suas alterações foram salvas.",
        });
      } else {
        // Fallback to localStorage
        const updatedIdeas = ideas.map(idea => 
          idea.id === editingIdea.id 
            ? { ...ideaData, id: editingIdea.id, createdAt: editingIdea.createdAt }
            : idea
        );
        setIdeas(updatedIdeas);
        localStorage.setItem('idea-tracker-ideas', JSON.stringify(updatedIdeas.map(idea => ({
          ...idea,
          createdAt: idea.createdAt.toISOString()
        }))));
        toast({
          title: "Ideia atualizada (offline)!",
          description: "Suas alterações foram salvas localmente.",
        });
      }
      setEditingIdea(null);
    } catch (error) {
      console.error('Failed to update idea:', error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar a ideia. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteIdea = async (id: string) => {
    try {
      if (isOnline) {
        await apiService.deleteIdea(id);
        setIdeas(ideas.filter(idea => idea.id !== id));
        toast({
          title: "Ideia excluída",
          description: "A ideia foi removida com sucesso.",
          variant: "destructive",
        });
      } else {
        // Fallback to localStorage
        const updatedIdeas = ideas.filter(idea => idea.id !== id);
        setIdeas(updatedIdeas);
        localStorage.setItem('idea-tracker-ideas', JSON.stringify(updatedIdeas.map(idea => ({
          ...idea,
          createdAt: idea.createdAt.toISOString()
        }))));
        toast({
          title: "Ideia excluída (offline)",
          description: "A ideia foi removida localmente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to delete idea:', error);
      toast({
        title: "Erro",
        description: "Falha ao excluir a ideia. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleEditIdea = (idea: Idea) => {
    setEditingIdea(idea);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingIdea(null);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Get all unique tags from ideas
  const availableTags = Array.from(
    new Set(ideas.flatMap(idea => idea.tags))
  ).sort();

  // Filter ideas based on search term, category, and tags
  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => idea.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const getIdeasCountByCategory = () => {
    const counts = ideas.reduce((acc, idea) => {
      acc[idea.category] = (acc[idea.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return counts;
  };

  const categoryStats = getIdeasCountByCategory();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Carregando suas ideias...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full text-white">
              <Lightbulb className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Idea Tracker
            </h1>
            <Sparkles className="h-6 w-6 text-purple-500" />
            <div className="ml-2">
              {isOnline ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Capture, organize e desenvolva suas ideias de forma inteligente. 
            Nunca mais perca uma insight valiosa!
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border">
              <span className="text-sm text-gray-600">Total: </span>
              <span className="font-semibold text-gray-800">{ideas.length} ideias</span>
            </div>
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="bg-white px-3 py-1 rounded-full shadow-sm border">
                <span className="text-xs text-gray-500 capitalize">{category}: </span>
                <span className="font-medium text-gray-700">{count}</span>
              </div>
            ))}
          </div>
          
          <Button
            onClick={() => setIsFormOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nova Ideia
          </Button>
        </div>

        {/* Search and Filter */}
        {ideas.length > 0 && (
          <div className="mb-8">
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              availableTags={availableTags}
            />
          </div>
        )}

        {/* Ideas Grid */}
        {filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onEdit={handleEditIdea}
                onDelete={handleDeleteIdea}
              />
            ))}
          </div>
        ) : ideas.length > 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma ideia encontrada
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Tente ajustar os filtros ou termos de busca para encontrar suas ideias.
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">💡</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Sua primeira ideia está esperando!
            </h3>
            <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
              Comece capturando suas ideias e insights. Organize-as por categoria e nunca mais esqueça uma boa ideia.
            </p>
            <Button
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              <Plus className="h-5 w-5 mr-2" />
              Criar Primeira Ideia
            </Button>
          </div>
        )}

        {/* Form Modal */}
        <IdeaForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={editingIdea ? handleUpdateIdea : handleCreateIdea}
          editingIdea={editingIdea}
        />
      </div>
    </div>
  );
};

export default Index;
