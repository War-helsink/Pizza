import type { Story as StoryBase, StoryItem } from "@prisma/client";

export interface Story extends StoryBase {
	items: StoryItem[];
}
