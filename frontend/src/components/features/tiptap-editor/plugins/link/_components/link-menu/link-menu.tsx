import { FC, useCallback, useState } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { LinkPreviewPanel } from "./link-preview-panel";
import { LinkDialog } from "./link-dialog";

type LinkMenuProps = {
  editor: Editor;
};

export const LinkMenu: FC<LinkMenuProps> = ({ editor }) => {
  const [showEdit, setShowEdit] = useState(false);
  const link = editor.getAttributes("link").href;

  const shouldShow = useCallback(() => {
    return editor.isActive("link");
  }, [editor]);

  const handleEdit = useCallback(() => {
    setShowEdit(true);
  }, []);

  const onSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
        .run();
      setShowEdit(false);
    },
    [editor]
  );

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowEdit(false);
  }, [editor]);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        duration: 100,
        onHidden: () => {
          setShowEdit(false);
        },
      }}
    >
      {showEdit ? (
        <LinkDialog
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
          initialUrl={link}
          initialOpenInNewTab={editor.getAttributes("link").target === "_blank"}
          onSetLink={onSetLink}
        />
      ) : (
        <LinkPreviewPanel url={link} onClear={onUnsetLink} onEdit={handleEdit} />
      )}
    </BubbleMenu>
  );
}; 