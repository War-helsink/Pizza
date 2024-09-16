"use client";

import { useState } from "react";
import { cn } from "@/libs/utils";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import { Container, Skeleton } from "@/components/shared/ui";
import { useGetStoriesQuery } from "@/components/entities/stories";

import type { Story } from "@/@types/entities";
import type { StoriesProps } from "../../model/props";

export const Stories: React.FC<StoriesProps> = ({ className }) => {
	const { data: stories } = useGetStoriesQuery(null);
	const [open, setOpen] = useState(false);
	const [selectedStory, setSelectedStory] = useState<Story>();

	const onClickStory = (story: Story) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	};

	return (
		<>
			<Container
				className={cn(
					"flex items-center justify-between gap-2 my-10 overflow-x-auto scrollbar-hidden",
					className,
				)}
			>
				{stories && stories.length > 0
					? stories.map((story) => (
							<img
								key={story.id}
								onClick={() => onClickStory(story)}
								className="rounded-md cursor-pointer"
								height={250}
								width={200}
								loading="lazy"
								src={story.previewImageUrl}
								alt=""
							/>
						))
					: [...Array(6)].map((_, index) => (
							<Skeleton
								key={index}
								className="min-w-[200px] h-[250px] bg-gray-200"
							/>
						))}

				{open && (
					<div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
						<div className="relative" style={{ width: 520 }}>
							<button
								type="button"
								className="absolute -right-10 -top-5 z-30"
								onClick={() => setOpen(false)}
							>
								<X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
							</button>

							<ReactStories
								onAllStoriesEnd={() => setOpen(false)}
								stories={
									selectedStory?.items.map((item) => ({
										url: item.sourceUrl,
									})) || []
								}
								defaultInterval={3000}
								width={520}
								height={800}
							/>
						</div>
					</div>
				)}
			</Container>
		</>
	);
};
