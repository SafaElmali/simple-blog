import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HtmlViewer } from "@/components/features/html-viewer";

type OutputTabsProps = {
  content: string;
};

export const OutputTabs: FC<OutputTabsProps> = ({ content }) => {
  return (
    <Tabs defaultValue="html" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="html">HTML Output</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="html" className="mt-2">
        <div className="rounded-md border bg-muted p-4">
          <pre className="whitespace-pre-wrap break-all text-sm">
            {content}
          </pre>
        </div>
      </TabsContent>
      <TabsContent value="preview" className="mt-2">
        <HtmlViewer content={content} />
      </TabsContent>
    </Tabs>
  );
}; 