
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = 'grammar' | 'vocabulary' | 'pronunciation';

type QuestionData = {
  question: string;
  correct_answer: string;
  category: Category;
};

type AssessmentData = {
  score: number;
  feedback: string;
};

const QuestionPractice: React.FC = () => {
  const [category, setCategory] = useState<Category>('grammar');
  const [loading, setLoading] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [assessingAnswer, setAssessingAnswer] = useState<boolean>(false);

  const generateQuestion = async () => {
    setLoading(true);
    setQuestionData(null);
    setUserAnswer('');
    setAssessment(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-question', {
        body: { category }
      });
      
      if (error) throw error;
      
      setQuestionData(data);
    } catch (error) {
      console.error('Error generating question:', error);
      toast.error('Failed to generate question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const assessAnswer = async () => {
    if (!questionData) return;
    
    setAssessingAnswer(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('assess-answer', {
        body: {
          userAnswer,
          correctAnswer: questionData.correct_answer,
          question: questionData.question
        }
      });
      
      if (error) throw error;
      
      setAssessment(data);
    } catch (error) {
      console.error('Error assessing answer:', error);
      toast.error('Failed to assess answer. Please try again.');
    } finally {
      setAssessingAnswer(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Language Practice</h2>
        <p className="text-muted-foreground">
          Practice your language skills with AI-generated questions.
        </p>
      </div>
      
      <div className="flex items-end gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            <option value="grammar">Grammar</option>
            <option value="vocabulary">Vocabulary</option>
            <option value="pronunciation">Pronunciation</option>
          </select>
        </div>
        
        <Button onClick={generateQuestion} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Generate Question
        </Button>
      </div>
      
      {questionData && (
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              {questionData.category.toUpperCase()}
            </div>
            <div className="text-lg font-semibold">
              {questionData.question}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="answer">Your Answer</Label>
            <Input 
              id="answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={assessment !== null}
            />
          </div>
          
          {!assessment && (
            <Button 
              onClick={assessAnswer} 
              disabled={assessingAnswer || !userAnswer.trim()}
              className="w-full"
            >
              {assessingAnswer ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit Answer
            </Button>
          )}
          
          {assessment && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">Score:</div>
                <div 
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    assessment.score >= 0.8 
                      ? "bg-bicaraGreen-100 text-bicaraGreen-800" 
                      : assessment.score >= 0.5 
                        ? "bg-amber-100 text-amber-800"
                        : "bg-bicaraRed-100 text-bicaraRed-800"
                  )}
                >
                  {Math.round(assessment.score * 100)}%
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-medium">Feedback:</div>
                <div className="text-sm text-muted-foreground">
                  {assessment.feedback}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-medium">Correct Answer:</div>
                <div className="text-sm font-semibold">
                  {questionData.correct_answer}
                </div>
              </div>
              
              <Button onClick={generateQuestion} className="w-full">
                Try Another Question
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default QuestionPractice;
