"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogrup";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";


interface Question {
  id: string;
  section: string;
  type: "multiple_choice" | "short_answer" | "long_answer";
  question: string;
  required: boolean;
  options?: string[] | number[];
}

const sampleQuestions: Question[] = [
  {
    id: "1",
    section: "Respondent Profile",
    type: "multiple_choice",
    question: "What is your age group?",
    required: true,
    options: ["18-25", "26-35", "36-45", "46-55", "56-65", "Over 65"]
  },
  {
    id: "2", 
    section: "Respondent Profile",
    type: "short_answer",
    question: "What is your occupation?",
    required: true,
  },
  {
    id: "3",
    section: "Environment Awareness",
    type: "multiple_choice", 
    question: "How would you rate your knowledge of environmental issues?",
    required: true,
    options: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
  },
  {
    id: "4",
    section: "Environment Awareness",
    type: "multiple_choice",
    question: "Which of the following environmental issues concern you most?",
    required: true,
    options: ["Climate Change", "Air Pollution", "Water Pollution", "Deforestation", "Waste Management", "Biodiversity Loss"]
  },
  {
    id: "5",
    section: "Environment Awareness",
    type: "long_answer",
    question: "Describe any environmental initiatives or practices you personally follow to reduce your environmental impact.",
    required: false
  },
  {
    id: "6",
    section: "Policy Feedback",
    type: "multiple_choice",
    question: "How effective do you think current government environmental policies are?",
    required: true,
    options: ["Very Ineffective", "Ineffective", "Neutral", "Effective", "Very Effective"]
  },
  {
    id: "7",
    section: "Policy Feedback",
    type: "long_answer",
    question: "What specific environmental policies or initiatives would you like to see implemented in your community?",
    required: false
  }
];

export default function QuestionnairePage() {
  const navigate = useRouter();
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections = Array.from(new Set(sampleQuestions.map(q => q.section)));
  const totalQuestions = sampleQuestions.length;
  const answeredQuestions = Object.keys(responses).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const validateForm = () => {
    const requiredQuestions = sampleQuestions.filter(q => q.required);
    const missingRequired = requiredQuestions.filter(q => !responses[q.id]);
    return missingRequired;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const missingRequired = validateForm();
    if (missingRequired.length > 0) {
      toast.error("survey belum lengkap!",{
        description: `terdapat ${missingRequired.length} pertanyaan wajib yang belum diisi. Silahkan cek kembali`
      }); 
      return;
    }

    setIsSubmitting(true);
    
 
    setTimeout(() => {
      toast("Survey Submitted Successfully! Thank you for your participation. Your responses have been recorded.");
      setIsSubmitting(false);
      navigate.push("/questionnaire");
    }, 2000);
  };

  const renderQuestion = (question: Question) => {
    const value = responses[question.id] || "";
    
    switch (question.type) {
      case "multiple_choice":
        return (
          <RadioGroup
            value={value}
            onValueChange={(value) => handleResponseChange(question.id, value)}
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={String(option)} id={`${question.id}-${option}`} />
                <Label htmlFor={`${question.id}-${option}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case "short_answer":
        return (
          <Input
            value={value}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter your answer..."
            className="w-full"
          />
        );
      
      case "long_answer":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Please provide a detailed answer..."
            className="w-full min-h-[120px]"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          Environmental Awareness Survey 2024
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Help us understand environmental awareness and practices in your community. 
          Your responses will contribute to important environmental policy decisions.
        </p>
        
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{answeredQuestions} of {totalQuestions} questions</span>
          </div>
          <Progress value={progress} className="h-2 bg-cyan-200" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {sections.map((section) => (
          <Card key={section} className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {section}
              </h2>
              <div className="h-1 w-16 bg-gradient-primary rounded-full" />
            </div>

            <div className="space-y-6">
              {sampleQuestions
                .filter(q => q.section === section)
                .map((question) => (
                  <div key={question.id} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <Label className="text-base font-medium text-foreground leading-relaxed">
                        {question.question}
                      </Label>
                      <div className="flex items-center space-x-2 ml-4">
                        {question.required && (
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        )}
                        {responses[question.id] && (
                          <CheckCircle className="w-4 h-4 text-secondary" />
                        )}
                        {question.required && !responses[question.id] && (
                          <AlertCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                    </div>
                    {renderQuestion(question)}
                  </div>
                ))}
            </div>
          </Card>
        ))}


        <div className="text-center">
          <Button 
            type="submit" 
            size="lg"
            disabled={isSubmitting}
            className="min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Survey
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Your responses are confidential and will be used for research purposes only.
          </p>
        </div>
      </form>
    </div>
  );
  }