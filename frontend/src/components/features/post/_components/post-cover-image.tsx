import { FC } from "react";
import Image from "next/image";
type PostCoverImageProps = {
  coverImage: string;
  title: string;
};

const PostCoverImage: FC<PostCoverImageProps> = ({ coverImage, title }) => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      <Image src={coverImage} alt={title} fill className="object-cover" />
    </div>
  );
};

export { PostCoverImage };
