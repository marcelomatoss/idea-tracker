
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Clock } from 'lucide-react';
import { type Idea } from '@/services/apiService';

interface IdeaCardProps {
  idea: Idea;
  onEdit: (idea: Idea) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  personal: 'bg-gradient-to-br from-pink-500 to-rose-500',
  work: 'bg-gradient-to-br from-blue-500 to-indigo-500',
  creative: 'bg-gradient-to-br from-purple-500 to-violet-500',
  tech: 'bg-gradient-to-br from-green-500 to-emerald-500',
  business: 'bg-gradient-to-br from-orange-500 to-amber-500',
};

const IdeaCard = ({ idea, onEdit, onDelete }: IdeaCardProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden">
      <div className={`h-2 ${categoryColors[idea.category]}`} />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
            {idea.title}
          </CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(idea)}
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Edit"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(idea.id)}
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {idea.description}
        </p>
        
        {idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {idea.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <Clock className="h-3 w-3" />
          <span>{formatDate(idea.createdAt)}</span>
          <Badge variant="outline" className="ml-auto text-xs capitalize">
            {idea.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdeaCard;
