import { formattedDate } from "./date";

type Props = {
  title: string;
  createdDate: string;
  description: string;
  iconUrl: string;
  tags: string[];
  entryName: string;
};
export const ArticleListItem = (props: Props) => {
  return (
    <a href={`/posts/${props.entryName}`}>
      <div class={"flex gap-6 items-center"}>
        <div
          class={
            "flex items-center rounded-xl bg-[#f8f1d4] dark:bg-[#353535] p-4 shrink-0 max-h-20"
          }
        >
          <img src={props.iconUrl} alt="article icon" class={"w-12 h-12"} />
        </div>
        <div class={"flex flex-col gap-2 dark:text-gray-100"}>
          <h2 class={"text-xl font-semibold hover:underline max-md:text-lg"}>
            {props.title}
          </h2>
          <div>
            <time
              class={"text-gray-500 dark:text-gray-400 text-sm max-md:text-xs"}
            >
              {formattedDate(props.createdDate)}
            </time>
          </div>
        </div>
      </div>
    </a>
  );
};
