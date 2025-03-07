"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FC, useEffect, useState } from "react";
import { Loader2, History, Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const promptSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
});

type PromptFormValues = z.infer<typeof promptSchema>;

type AIPromptDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSuccess: (content: string) => void;
};

type PreviewState = {
  isPreview: boolean;
  content: string;
};

type GeneratedContent = {
  id: string;
  prompt: string;
  content: string;
  timestamp: Date;
};

export const AIPromptDialog: FC<AIPromptDialogProps> = ({
  open,
  onOpenChange,
  onSubmitSuccess,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<PreviewState>({
    isPreview: false,
    content: "",
  });
  const [history, setHistory] = useState<GeneratedContent[]>([]);

  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleSubmit = async (
    values: PromptFormValues,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: values.prompt }),
      });

      if (!response.ok) throw new Error("AI generation failed");

      const data = await response.json();
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        prompt: values.prompt,
        content: data.content,
        timestamp: new Date(),
      };
      
      setHistory(prev => [newContent, ...prev]);
      setPreview({ isPreview: true, content: data.content });
    } catch {
      toast({
        title: "Generation Failed",
        description: "Could not generate the content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyHistoryContent = (content: GeneratedContent) => {
    onSubmitSuccess(content.content);
    onOpenChange(false);
    toast({
      title: "Content Applied",
      description: "Historical content has been applied!",
    });
  };

  const handleBack = () => {
    setPreview({ isPreview: false, content: "" });
  };

  const handleConfirm = () => {
    onSubmitSuccess(preview.content);
    onOpenChange(false);
    toast({
      title: "Content Applied",
      description: "Your article has been generated!",
    });
  };

  useEffect(() => {
    if (!open) {
      form.reset();
      setPreview({ isPreview: false, content: "" });
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>AI Content Generator</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="generate" className="w-full flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">
              <Wand2 className="w-4 h-4 mr-2" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="flex-1 flex flex-col">
            {!preview.isPreview ? (
              <Form {...form}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What would you like to write about?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write an article about React JSX..."
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button"
                      variant="default"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={form.handleSubmit(handleSubmit)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            ) : (
              <div className="flex-1 flex flex-col space-y-4">
                <div className="flex-1 overflow-y-auto border rounded-md">
                  <div className="prose dark:prose-invert max-w-none">
                    <ScrollArea className="h-[60vh] p-4">
                      <div dangerouslySetInnerHTML={{ __html: preview.content }} />
                    </ScrollArea>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button"
                    variant="default"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleConfirm}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Apply Content
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto pr-2">
              {history.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No generated content history yet
                </p>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{item.prompt}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApplyHistoryContent(item)}
                        >
                          Apply
                        </Button>
                      </div>
                      <div className="max-h-32 overflow-y-auto border rounded p-2 mt-2">
                        <div className="prose dark:prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
