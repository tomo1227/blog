import { createRoute } from "honox/factory";

// FIX: ローカルでは期待した動作をしない
export default createRoute((c) => {
  return c.render(
    <div class="mt-6 flex flex-col justify-center items-center">
      <h1 class="text-6xl py-6">404 Not Found</h1>
      <h2 class="text-2xl">お探しのページが見つかりませんでした。</h2>
    </div>
  );
}
);
