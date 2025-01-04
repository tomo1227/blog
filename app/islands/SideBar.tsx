import { useEffect, useState } from "hono/jsx";

type SideBarProps = {
  tags: string[];
};

export default function SideBar({ tags }: SideBarProps) {
  const [showMore, setShowMore] = useState(false);
  const [visibleTagsCount, setVisibleTagsCount] = useState(5);

  const toggleMoreTags = () => {
    setShowMore((prev) => !prev);
  };

  const updateVisibleTagsCount = () => {
    const width = window.innerWidth;
    if (width > 1200) {
      setVisibleTagsCount(tags.length);
      setShowMore(true);
    } else if (width > 550) {
      setVisibleTagsCount(6);
      setShowMore(false);
    } else {
      setVisibleTagsCount(4);
      setShowMore(false);
    }
  };

  useEffect(() => {
    updateVisibleTagsCount();
    window.addEventListener("resize", updateVisibleTagsCount);
    return () => {
      window.removeEventListener("resize", updateVisibleTagsCount);
    };
  }, []);

  return (
    <aside id="side-tag-bar" class="w-1/6 p-4 flex justify-center fixed left-10">
      <nav id="tag-nav">
        <ul class="flex flex-wrap gap-2 mt-20 p-0 list-none">
          {tags.slice(0, showMore ? tags.length : visibleTagsCount).map((tag) => (
            <li key={tag} class="inline-block">
              <a
                href={`/tags/${tag}`}
                class="relative inline-block h-7 leading-7 px-3 bg-sky-500 rounded-full text-white text-xs no-underline transition duration-200 hover:bg-gray-700"
              >
                {tag}
              </a>
            </li>
          ))}

          {visibleTagsCount < tags.length && (
            <li key="more" class="inline-block">
              <button
                onClick={toggleMoreTags}
                class="relative inline-block h-7 leading-7 px-3 bg-slate-500 rounded-full text-white text-xs no-underline transition duration-200 hover:bg-gray-700"
              >
                {showMore ? "タグを隠す" : "タグを表示"}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
